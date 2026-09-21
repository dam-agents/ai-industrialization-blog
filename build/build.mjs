// Static site generator for the AI Industrialization blog.
// No dependencies and no network access, on purpose: the Pages build must never
// fail on a registry fetch. See CLAUDE.md before adding either.
//
//   node build/build.mjs          generate site/, IDEAS.md, CALENDAR.md
//   node build/build.mjs --check  validate only, write nothing

import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'site');
const CHECK_ONLY = process.argv.includes('--check');

const STATUSES = ['idea', 'approved', 'scheduled', 'published', 'declined'];
const CADENCE_WINDOW_DAYS = 28;
const CADENCE_MIN_POSTS = 2;

const errors = [];
const warnings = [];

// --- content loading ---------------------------------------------------------

/** Minimal frontmatter parser: `key: value` pairs, optional "quoted" values. */
function parseFrontmatter(raw, file) {
  if (!raw.startsWith('---')) {
    errors.push(`${file}: missing frontmatter block`);
    return { data: {}, body: raw };
  }
  const end = raw.indexOf('\n---', 3);
  if (end === -1) {
    errors.push(`${file}: frontmatter block is never closed`);
    return { data: {}, body: '' };
  }
  const data = {};
  for (const line of raw.slice(4, end).split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (value.startsWith('"') && value.endsWith('"') && value.length > 1) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    data[key] = value;
  }
  return { data, body: raw.slice(end + 4).trim() };
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function validDate(s) {
  if (!ISO_DATE.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function loadTopics() {
  const dir = join(ROOT, 'content/topics');
  const postsDir = join(ROOT, 'content/posts');
  const topics = [];

  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
    const slug = file.replace(/\.md$/, '');
    const { data, body } = parseFrontmatter(readFileSync(join(dir, file), 'utf8'), file);
    const status = data.status || '';

    if (!STATUSES.includes(status)) {
      errors.push(`${file}: status "${status}" is not one of ${STATUSES.join(', ')}`);
    }
    if (!data.title) errors.push(`${file}: missing title`);

    for (const key of ['publish_date', 'target_date', 'proposed_on', 'approved_on']) {
      if (data[key] && !validDate(data[key])) {
        errors.push(`${file}: ${key} "${data[key]}" is not a valid YYYY-MM-DD date`);
      }
    }
    if (status === 'scheduled' && !data.publish_date) {
      errors.push(`${file}: status is scheduled but publish_date is empty`);
    }
    if (['approved', 'scheduled', 'published'].includes(status) && !data.approved_by) {
      errors.push(`${file}: status is ${status} but approved_by is empty — approvals must be attributed`);
    }

    // A published topic needs a real body to publish.
    const postPath = join(postsDir, file);
    let post = null;
    if (existsSync(postPath)) {
      const parsed = parseFrontmatter(readFileSync(postPath, 'utf8'), `posts/${file}`);
      post = { ...parsed.data, body: parsed.body };
    }
    if (status === 'published' && !post?.body) {
      errors.push(`${file}: status is published but content/posts/${file} is missing or empty`);
    }

    topics.push({ slug, ...data, status, blurb: body, post });
  }

  // Two posts can't share a publish date.
  const byDate = new Map();
  for (const t of topics) {
    if (!t.publish_date) continue;
    if (!['scheduled', 'published'].includes(t.status)) continue;
    if (byDate.has(t.publish_date)) {
      errors.push(`${t.slug}: publish_date ${t.publish_date} collides with ${byDate.get(t.publish_date)}`);
    } else {
      byDate.set(t.publish_date, t.slug);
    }
  }

  return topics;
}

// --- cadence -----------------------------------------------------------------

function checkCadence(topics) {
  const todayISO = new Date().toISOString().slice(0, 10);
  const horizon = new Date(Date.now() + CADENCE_WINDOW_DAYS * 864e5).toISOString().slice(0, 10);
  const upcoming = topics.filter(
    (t) => t.status === 'scheduled' && t.publish_date >= todayISO && t.publish_date <= horizon
  );
  if (upcoming.length < CADENCE_MIN_POSTS) {
    const ready = topics.filter((t) => t.status === 'approved');
    const targeted = topics.filter(
      (t) =>
        t.target_date &&
        t.status !== 'scheduled' &&
        t.status !== 'published' &&
        t.target_date >= todayISO &&
        t.target_date <= horizon
    );
    warnings.push(
      `Cadence: only ${upcoming.length} post(s) scheduled in the next ${CADENCE_WINDOW_DAYS} days ` +
        `(target is ${CADENCE_MIN_POSTS}, one every two weeks).` +
        (ready.length
          ? ` ${ready.length} approved topic(s) awaiting a date: ${ready.map((t) => t.slug).join(', ')}.`
          : ' No approved topics are waiting — the pipeline needs leadership review.') +
        (targeted.length
          ? ` Target date(s) set but not yet approved: ${targeted
              .map((t) => `${t.slug} (${t.target_date})`)
              .join(', ')}.`
          : '')
    );
  }
}

// --- rendering helpers -------------------------------------------------------

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Tiny markdown subset: ##/### headings, > quotes, lists, paragraphs, inline marks. */
function markdown(src) {
  const inline = (s) =>
    esc(s)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(])\*([^*]+)\*/g, '$1<em>$2</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');

  const out = [];
  for (const block of src.split(/\n{2,}/)) {
    const b = block.trim();
    if (!b) continue;
    let m;
    if ((m = /^###\s+(.*)$/s.exec(b))) out.push(`<h3 class="post-h3">${inline(m[1])}</h3>`);
    else if ((m = /^##\s+(.*)$/s.exec(b))) out.push(`<h2 class="post-h2">${inline(m[1])}</h2>`);
    else if (b.startsWith('> ')) {
      const q = b.split('\n').map((l) => l.replace(/^>\s?/, '')).join(' ');
      out.push(`<blockquote class="pull"><p>${inline(q)}</p></blockquote>`);
    } else if (/^[-*]\s/.test(b)) {
      const items = b.split('\n').map((l) => `<li>${inline(l.replace(/^[-*]\s+/, ''))}</li>`).join('');
      out.push(`<ul class="post-list">${items}</ul>`);
    } else {
      out.push(`<p class="post-p">${inline(b.replace(/\n/g, ' '))}</p>`);
    }
  }
  return out.join('\n');
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function longDate(iso) {
  if (!iso || !validDate(iso)) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function monthYear(iso) {
  if (!iso || !validDate(iso)) return '';
  const [y, m] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

// --- page shell --------------------------------------------------------------

function shell({ site, title, description, body, nav, relative = '' }) {
  const base = relative;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;600&family=IBM+Plex+Serif:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}styles.css">
</head>
<body>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${base}index.html">
      <span class="brand-org">${esc(site.org)}</span>
      <span class="brand-name">${esc(site.name)}</span>
    </a>
    <nav class="site-nav">
      <a href="${base}index.html"${nav === 'home' ? ' class="current"' : ''}>Writing</a>
      <a href="${base}about.html"${nav === 'about' ? ' class="current"' : ''}>Who we are</a>
      <a href="${base}calendar.html"${nav === 'calendar' ? ' class="current"' : ''}>What's coming</a>
    </nav>
  </div>
</header>
${body}
<footer class="site-footer">
  <div class="wrap footer-inner">
    <div class="footer-col">
      <span class="mono-label dim">${esc(site.org)}</span>
      <span class="footer-name">${esc(site.name)}</span>
      <span class="footer-blurb">${esc(site.tagline)}</span>
    </div>
    <div class="footer-col">
      <span class="mono-label dim">Site</span>
      <a href="${base}index.html">Writing</a>
      <a href="${base}about.html">Who we are</a>
      <a href="${base}calendar.html">What's coming</a>
    </div>
    <div class="footer-col">
      <span class="mono-label dim">Focus</span>
      ${site.workloads.map((w) => `<span class="footer-item">${esc(w.name)}</span>`).join('\n      ')}
    </div>
  </div>
</footer>
</body>
</html>
`;
}

// --- pages -------------------------------------------------------------------

function renderHome(site, topics) {
  const published = topics
    .filter((t) => t.status === 'published')
    .sort((a, b) => (b.publish_date || '').localeCompare(a.publish_date || ''));
  const coming = topics
    .filter((t) => t.status === 'scheduled')
    .sort((a, b) => a.publish_date.localeCompare(b.publish_date));

  const [lead, ...rest] = published;

  const leadSections = (lead?.post?.sections || '').split('|').map((s) => s.trim()).filter(Boolean);

  const leadCard = lead
    ? `<article class="lead">
        <a class="lead-link" href="posts/${esc(lead.slug)}.html">
          <div class="lead-body">
            <span class="mono-label accent">${published.length > 1 ? 'Latest' : 'Pinned — first post'}</span>
            <h3 class="lead-title">${esc(lead.title)}</h3>
            <p class="lead-blurb">${esc(lead.post?.lede || lead.blurb)}</p>
            <div class="lead-meta">
              <span>${esc(lead.authors)}</span>
              <span class="rule"></span>
              <span class="mono">${esc(monthYear(lead.publish_date))}</span>
              ${lead.post?.read_time ? `<span class="rule"></span><span class="mono">${esc(lead.post.read_time)}</span>` : ''}
            </div>
          </div>
          <div class="lead-side">
            <span class="mono-label lead-side-label">Start here</span>
            <div class="lead-side-list">
              ${leadSections.map((s) => `<span class="lead-side-item">${esc(s)}</span>`).join('\n              ')}
              <span class="lead-side-cta">Read the post →</span>
            </div>
          </div>
        </a>
      </article>`
    : `<article class="lead lead-empty">
        <div class="lead-body">
          <span class="mono-label accent">Nothing published yet</span>
          <h3 class="lead-title">The first post is on its way.</h3>
          <p class="lead-blurb">New posts will appear here as soon as they're live.</p>
        </div>
      </article>`;

  const card = (t, isComing) => `<a class="card${isComing ? ' card-coming' : ''}" href="${
    isComing ? 'calendar.html' : `posts/${esc(t.slug)}.html`
  }">
            <span class="mono-label dim">${esc(t.tag)}</span>
            <h3 class="card-title">${esc(t.title)}</h3>
            <p class="card-blurb">${esc(t.blurb)}</p>
            <div class="card-meta">
              <span>${esc(t.authors || (isComing ? 'Author TBC' : ''))}</span>
              <span class="mono${isComing ? ' accent' : ''}">${
    isComing ? 'Coming soon' : esc(monthYear(t.publish_date)) + (t.post?.read_time ? ` · ${esc(t.post.read_time)}` : '')
  }</span>
            </div>
          </a>`;

  const grid = [...rest.map((t) => card(t, false)), ...coming.map((t) => card(t, true))];

  const body = `<main>
  <section class="hero-section">
    <div class="wrap hero">
      <div>
        <div class="eyebrow"><span class="tick"></span><span class="mono-label dim">${esc(site.hero.eyebrow)}</span></div>
        <h1 class="hero-h1">${esc(site.hero.heading)}</h1>
        <p class="hero-lede">${esc(site.hero.lede)}</p>
        <div class="hero-cta">
          <a class="btn-primary" href="about.html">How we work</a>
          <a class="btn-secondary" href="calendar.html">What's coming</a>
        </div>
      </div>
      <aside class="hero-aside">
        <p class="hero-aside-p">${esc(site.hero.aside)}</p>
        <div class="workloads">
          ${site.workloads
            .map(
              (w) =>
                `<div class="workload"><span class="mono workload-n">${esc(w.n)}</span><span class="workload-name">${esc(w.name)}</span></div>`
            )
            .join('\n          ')}
        </div>
        <span class="mono-label dim">What we build</span>
      </aside>
    </div>
  </section>

  <section class="writing-section">
    <div class="wrap">
      <div class="section-head">
        <h2 class="mono-label dim">Writing from the team</h2>
        <span class="section-note">${esc(site.writingIntro)}</span>
      </div>
      ${leadCard}
      ${grid.length ? `<div class="card-grid">\n          ${grid.join('\n          ')}\n      </div>` : ''}
    </div>
  </section>

  <section>
    <div class="wrap what-we-do">
      <h2 class="mono-label dim">What we do</h2>
      <div class="cap-list">
        ${site.capabilities
          .map(
            (c) =>
              `<div class="cap-row"><h3 class="cap-title">${esc(c.title)}</h3><p class="cap-body">${esc(c.body)}</p></div>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>
</main>`;

  return shell({ site, title: `${site.name} — ${site.org}`, description: site.hero.lede, body, nav: 'home' });
}

function renderAbout(site) {
  const body = `<main>
  <section class="about-hero">
    <div class="wrap">
      <div class="eyebrow"><span class="tick tick-light"></span><span class="mono-label">Who we are</span></div>
      <h1 class="about-h1">${esc(site.about.heading)}</h1>
    </div>
  </section>

  <section class="about-cols-section">
    <div class="wrap about-cols">
      ${site.about.paragraphs
        .map((p) => `<p class="about-p">${esc(p)}</p>`)
        .join('\n      ')}
    </div>
  </section>

  <section class="principles-section">
    <div class="wrap">
      <h2 class="mono-label dim principles-head">How we work</h2>
      <div class="principle-grid">
        ${site.principles
          .map(
            (p) =>
              `<div class="principle"><span class="mono accent">${esc(p.n)}</span><h3 class="principle-title">${esc(p.title)}</h3><p class="principle-body">${esc(p.body)}</p></div>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section>
    <div class="wrap about-caps">
      <h2 class="mono-label dim">What we do</h2>
      <div class="cap-list-wide">
        ${site.capabilities
          .map(
            (c) =>
              `<div class="cap-row-wide"><span class="mono cap-n">${esc(c.n)}</span><h3 class="cap-title-wide">${esc(c.title)}</h3><p class="cap-body-wide">${esc(c.body)}</p></div>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>
</main>`;

  return shell({ site, title: `Who we are — ${site.name}`, description: site.about.heading, body, nav: 'about' });
}

function renderCalendar(site, topics) {
  const scheduled = topics
    .filter((t) => t.status === 'scheduled')
    .sort((a, b) => a.publish_date.localeCompare(b.publish_date));
  const published = topics
    .filter((t) => t.status === 'published')
    .sort((a, b) => (b.publish_date || '').localeCompare(a.publish_date || ''));

  const row = (t, kind) => `<div class="cal-row">
          <span class="mono cal-date">${esc(longDate(t.publish_date))}</span>
          <div class="cal-main">
            <span class="mono-label dim">${esc(t.tag)}</span>
            <h3 class="cal-title">${
              kind === 'published' ? `<a href="posts/${esc(t.slug)}.html">${esc(t.title)}</a>` : esc(t.title)
            }</h3>
            <p class="cal-blurb">${esc(t.blurb)}</p>
            <span class="cal-authors">${esc(t.authors || 'Author TBC')}</span>
          </div>
          <span class="cal-status cal-${kind}">${kind === 'published' ? 'Published' : 'Coming soon'}</span>
        </div>`;

  const body = `<main>
  <section class="cal-hero">
    <div class="wrap">
      <div class="eyebrow"><span class="tick"></span><span class="mono-label dim">Publishing calendar</span></div>
      <h1 class="cal-h1">What's coming</h1>
      <p class="cal-lede">We aim to publish once every two weeks.</p>
    </div>
  </section>

  <section class="cal-section">
    <div class="wrap">
      <h2 class="mono-label dim cal-group-head">Scheduled</h2>
      ${
        scheduled.length
          ? `<div class="cal-list">\n        ${scheduled.map((t) => row(t, 'scheduled')).join('\n        ')}\n      </div>`
          : '<p class="cal-empty">Nothing scheduled yet.</p>'
      }
    </div>
  </section>
${
  published.length
    ? `
  <section class="cal-section cal-section-alt">
    <div class="wrap">
      <h2 class="mono-label dim cal-group-head">Published</h2>
      <div class="cal-list">
        ${published.map((t) => row(t, 'published')).join('\n        ')}
      </div>
    </div>
  </section>`
    : ''
}
</main>`;

  return shell({
    site,
    title: `What's coming — ${site.name}`,
    description: 'Scheduled and published posts from the AI Industrialization team.',
    body,
    nav: 'calendar',
  });
}

function renderPost(site, topic, topics) {
  const post = topic.post || {};
  const sections = (post.sections || '').split('|').map((s) => s.trim()).filter(Boolean);
  const related = topics
    .filter((t) => t.slug !== topic.slug && ['published', 'scheduled'].includes(t.status))
    .slice(0, 4);

  const body = `<main>
  <article>
    <header class="post-header">
      <div class="wrap">
        <a class="mono-label accent back" href="../index.html">← All writing</a>
        <h1 class="post-h1">${esc(topic.title)}</h1>
        <p class="post-lede">${esc(post.lede || topic.blurb)}</p>
        <div class="post-meta">
          <div class="post-meta-item"><span class="mono-label dim">Authors</span><span>${esc(topic.authors)}</span></div>
          <div class="post-meta-item"><span class="mono-label dim">Published</span><span>${esc(longDate(topic.publish_date))}</span></div>
          <div class="post-meta-item"><span class="mono-label dim">Topic</span><span>${esc(topic.tag)}</span></div>
          ${post.read_time ? `<div class="post-meta-item"><span class="mono-label dim">Read time</span><span>${esc(post.read_time)}</span></div>` : ''}
        </div>
      </div>
    </header>

    <div class="wrap post-grid">
      <nav class="post-toc">
        ${sections
          .map(
            (s, i) =>
              `<span class="toc-item"><span class="mono toc-n">${String(i + 1).padStart(2, '0')}</span><span>${esc(s)}</span></span>`
          )
          .join('\n        ')}
      </nav>

      <div class="post-body">
        ${markdown(post.body || '')}
        <div class="post-foot">
          <span>${esc(site.name)} — ${esc(site.org)}</span>
          <a href="../about.html">Who we are →</a>
        </div>
      </div>

      <aside class="post-related">
        <span class="mono-label dim">Related</span>
        ${related
          .map(
            (t) =>
              `<a class="related-item" href="${
                t.status === 'published' ? `${esc(t.slug)}.html` : '../calendar.html'
              }"><span class="mono related-tag">${esc(t.tag)}</span><span class="related-title">${esc(t.title)}</span></a>`
          )
          .join('\n        ')}
      </aside>
    </div>
  </article>
</main>`;

  return shell({
    site,
    title: `${topic.title} — ${site.name}`,
    description: post.lede || topic.blurb,
    body,
    nav: 'home',
    relative: '../',
  });
}

// --- generated docs ----------------------------------------------------------

const GENERATED_NOTE =
  '<!-- GENERATED by build/build.mjs — do not edit. Change content/topics/ and run `npm run build`. -->';

function renderIdeasDoc(topics) {
  const byStatus = (s) => topics.filter((t) => t.status === s);
  const table = (rows) =>
    rows.length
      ? ['| Topic | Tag | Proposed by | Authors | Target |', '|---|---|---|---|---|']
          .concat(
            rows.map(
              (t) =>
                `| [${t.title}](content/topics/${t.slug}.md) | ${t.tag || '—'} | ${t.proposed_by || '—'} | ${
                  t.authors || '_unassigned_'
                } | ${t.target_date ? `\`${t.target_date}\`` : '—'} |`
            )
          )
          .join('\n')
      : '_None._';

  const ideas = byStatus('idea');
  const approved = byStatus('approved');
  const declined = byStatus('declined');
  const inFlight = topics.filter((t) => ['scheduled', 'published'].includes(t.status));

  const byTag = new Map();
  for (const t of ideas) byTag.set(t.tag || 'Untagged', (byTag.get(t.tag || 'Untagged') || 0) + 1);

  return `${GENERATED_NOTE}

# Blog topic ideas

Every topic proposed for the blog. **Nothing here is on the public site** until
leadership approves it and it gets a date — see [CLAUDE.md](CLAUDE.md) for how a
topic moves through the pipeline.

To suggest a topic: open an issue with the **Blog topic proposal** template, or add
a file to \`content/topics/\` with \`status: idea\`.

| | Count |
|---|---|
| Awaiting review (\`idea\`) | **${ideas.length}** |
| Approved, needs a date (\`approved\`) | **${approved.length}** |
| Scheduled or published | **${inFlight.length}** |
| Declined | **${declined.length}** |

## Approved — waiting for a date

Leadership has said yes. These need an author and a \`publish_date\` to move onto
the [calendar](CALENDAR.md).

${table(approved)}

## Awaiting leadership review

${
  byTag.size
    ? `Ideas by area: ${[...byTag.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([k, v]) => `${k} (${v})`)
        .join(' · ')}\n`
    : ''
}
${table(ideas)}

## Declined

Kept on purpose — the reasoning is useful, and it saves re-proposing the same idea
next quarter.

${table(declined)}
`;
}

function renderCalendarDoc(topics) {
  const scheduled = topics
    .filter((t) => t.status === 'scheduled')
    .sort((a, b) => a.publish_date.localeCompare(b.publish_date));
  const published = topics
    .filter((t) => t.status === 'published')
    .sort((a, b) => (b.publish_date || '').localeCompare(a.publish_date || ''));
  const approved = topics.filter((t) => t.status === 'approved');
  const targeted = topics
    .filter((t) => t.target_date && !['scheduled', 'published', 'declined'].includes(t.status))
    .sort((a, b) => a.target_date.localeCompare(b.target_date));

  const rows = (list) =>
    list.length
      ? ['| Date | Topic | Authors | Status |', '|---|---|---|---|']
          .concat(
            list.map(
              (t) =>
                `| \`${t.publish_date || 'TBC'}\` | [${t.title}](content/topics/${t.slug}.md) | ${
                  t.authors || '_unassigned_'
                } | ${t.status} |`
            )
          )
          .join('\n')
      : '_None._';

  return `${GENERATED_NOTE}

# Publishing calendar

Target cadence: **one post every two weeks.** More is better.

Only \`scheduled\` and \`published\` topics appear here. Scheduled posts show on the
public site as "Coming soon"; ideas under review do not appear anywhere public.

## Target dates

Dates the team is aiming for. A \`target_date\` is **not** a commitment and does
not put a post on the public site — the topic still needs leadership approval,
then a \`publish_date\`, to become \`scheduled\`.

${
  targeted.length
    ? ['| Target | Topic | Status | Blocking |', '|---|---|---|---|']
        .concat(
          targeted.map(
            (t) =>
              `| \`${t.target_date}\` | [${t.title}](content/topics/${t.slug}.md) | ${t.status} | ${
                t.status === 'idea' ? 'needs leadership approval' : 'needs a `publish_date`'
              } |`
          )
        )
        .join('\n')
    : '_None._'
}

## Scheduled

${rows(scheduled)}

## Approved, not yet dated

${
  approved.length
    ? approved
        .map((t) => `- [${t.title}](content/topics/${t.slug}.md) — approved by ${t.approved_by || '—'}`)
        .join('\n')
    : '_None._'
}

## Published

${rows(published)}
`;
}

// --- main --------------------------------------------------------------------

const site = JSON.parse(readFileSync(join(ROOT, 'content/site.json'), 'utf8'));
const topics = loadTopics();
checkCadence(topics);

if (errors.length) {
  console.error(`\n✗ Build failed — ${errors.length} problem(s) in the topic pipeline:\n`);
  for (const e of errors) console.error(`  · ${e}`);
  console.error('');
  process.exit(1);
}

if (CHECK_ONLY) {
  console.log(`✓ ${topics.length} topics valid`);
  for (const w of warnings) console.warn(`⚠ ${w}`);
  process.exit(0);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'posts'), { recursive: true });

writeFileSync(join(OUT, 'index.html'), renderHome(site, topics));
writeFileSync(join(OUT, 'about.html'), renderAbout(site));
writeFileSync(join(OUT, 'calendar.html'), renderCalendar(site, topics));
writeFileSync(join(OUT, 'styles.css'), readFileSync(join(ROOT, 'build/styles.css')));
writeFileSync(join(OUT, '.nojekyll'), '');

const published = topics.filter((t) => t.status === 'published');
for (const t of published) {
  writeFileSync(join(OUT, 'posts', `${t.slug}.html`), renderPost(site, t, topics));
}

writeFileSync(join(ROOT, 'IDEAS.md'), renderIdeasDoc(topics));
writeFileSync(join(ROOT, 'CALENDAR.md'), renderCalendarDoc(topics));

const counts = STATUSES.map((s) => `${topics.filter((t) => t.status === s).length} ${s}`).join(', ');
console.log(`✓ site/ — ${3 + published.length} pages (${published.length} post${published.length === 1 ? '' : 's'})`);
console.log(`✓ IDEAS.md, CALENDAR.md — ${counts}`);
for (const w of warnings) console.warn(`⚠ ${w}`);
