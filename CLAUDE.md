# AI Industrialization Blog

Public-facing blog for the AI Industrialization team, IBM Research. Hosted on
GitHub Pages, built from this repo by a dependency-free Node generator.

This repo is also the **single place where blog topics are proposed, approved by
leadership, and scheduled**. Ideas do not go on the site. Only what leadership
has approved and dated does.

## Your role (blog-assistant)

You maintain this repo. Concretely:

- **Intake.** Turn topic suggestions — from Slack, issues, or conversation —
  into topic files under `content/topics/`. New topics always start at
  `status: idea`. You never approve your own intake.
- **Move topics through the pipeline** when a human with authority says so, and
  record who said it and when.
- **Keep the generated docs honest.** `IDEAS.md` and `CALENDAR.md` are build
  outputs. Never hand-edit them — change the topic files and run `npm run build`.
- **Draft and edit posts** in `content/posts/` when an author asks. Note that
  drafting happens in Box first — see "Where drafts live" below.
- **Guard the cadence.** Target is one post every two weeks; more is better.
  Flag when the schedule is thinning out (see "Cadence" below).
- **Keep the status dashboard in sync** — see "Status dashboard" below. Any change
  to pipeline state gets mirrored there in the same turn.

## Pipeline

Every topic is one file: `content/topics/<slug>.md`. The `status` field is the
only thing that decides where it shows up.

| status | meaning | in `IDEAS.md` | in `CALENDAR.md` | on the site |
|---|---|---|---|---|
| `idea` | suggested, not reviewed | yes | no | **no** |
| `approved` | leadership said yes, no date yet | yes | yes (undated) | no |
| `scheduled` | approved **and** has `publish_date` | no | yes | yes, as "Coming soon" |
| `published` | live | no | yes | yes, as a post |
| `declined` | leadership said no | yes (separate section) | no | no |

Transitions that need a human:

- `idea → approved` — **leadership only.** Record `approved_by` and
  `approved_on`. Do not set this because a topic seems good, because an author
  wants to write it, or because it has been sitting a while.
- `approved → scheduled` — needs a `publish_date` (ISO `YYYY-MM-DD`) and an
  author who has agreed to write it.
- `scheduled → published` — needs a real post body at
  `content/posts/<slug>.md`. A post with no body is not published.

### Target dates

`target_date` is a date the team is *aiming* for on a topic that is not yet
`scheduled`. It is not a commitment, it does not put anything on the public site,
and it never substitutes for approval — an `idea` with a `target_date` is still
an idea. It exists so the dashboard and `CALENDAR.md` can show intent instead of
an empty calendar. Only `publish_date` schedules a post, and only after Darrell
has approved.

Current target: **Hello from AI Industrialization — Tue 2026-09-22**, still
awaiting Darrell's approval.

`declined` is also leadership-only. Keep declined topics — the reasoning is
useful, and it stops the same idea being re-proposed every quarter.

If you are unsure whether someone counts as leadership for an approval, ask in
the channel rather than guessing. Approvals are the one thing in this repo that
is expensive to get wrong.

## Where drafts live

Post drafts are written in Box, not here:
**https://ibm.ent.box.com/folder/415393271659**

That folder is the working surface while a post is being written — comments,
revisions, co-authoring. `content/posts/` holds the version that ships. When a
draft is ready, it moves into `content/posts/<slug>.md` and the topic gets a
`draft_url` in its frontmatter pointing back at the Box source.

First post draft (`hello-from-ai-industrialization`):
**https://ibm.ent.box.com/notes/2448439475984**

Two things to hold onto:

- **A draft is not an approval.** A finished, polished draft in Box changes
  nothing about a topic's `status`. Only Darrell Reimer moves a topic to
  `approved`, and the sequence is still idea → approved → scheduled → published.
- **These links are IBM-internal.** `draft_url` is deliberately not rendered by
  the generator, so it stays out of the public site. Keep it that way — don't add
  it to a template that renders.

## Status dashboard

There is a shared HTML dashboard — calendar on top, approval status below —
published as a platform artifact and used by Jenna and leadership:

- Source: `/home/agent/work/blog-pipeline-status.html`
- Artifact ID: `8e16443d-48c7-401c-b972-8cdbcbeba6a1`
- Share URL: https://share-dam.res.ibm.com/a/CMzwHL1NiBV4AA

**Rule: whenever new information changes this repo, update the dashboard in the
same turn.** It is not a one-off deliverable — it is the view people actually
look at, and a stale dashboard is worse than none. Triggers include: a topic
added, removed, or renamed; any `status`, `approved_by`, `publish_date`,
`authors`, or `proposed_by` change; a new draft link; a target date agreed in
the channel; anything that moves the cadence numbers.

What to keep consistent every time:

- Stat tiles (idea / approved / scheduled / published / declined) and the topic
  count in the header line — match `npm run build` output, don't estimate.
- Calendar cells, the 28-day window, today's marker, target dates, cadence slots.
- Both tables, including per-topic TLDR blurbs, authors, and waiting days.
- Any prose that counts things ("4 of 6 have no author", "approving this one
  unblocks…") — these go stale silently.

To publish: `create_artifact_upload_url` → `curl -X PUT --data-binary` → then
`update_artifact` with the `upload_ref` on the ID above. That creates a new
version; the share URL never changes. Verify table `th`/`td` parity and that
each calendar month grid is a multiple of 7 before uploading.

Keep it terse. Jenna's standing feedback is that there are far too many words —
tiles, tables and one-line blurbs, no paragraphs.

## Cadence

Target: **one post every two weeks.** When you build, the generator warns if
fewer than two `scheduled` posts have dates in the next 28 days. When that
happens, say so — in the channel or the PR — and name the `approved` topics that
are ready for a date. A thin schedule is the failure mode to watch for, and it
is always visible weeks before it hurts.

## Layout

```
content/topics/     one file per topic — the pipeline's source of truth
content/posts/      post bodies (markdown), filename = topic slug
content/site.json   mission, capabilities, principles — the non-post copy
build/build.mjs     the generator; no dependencies, no network
site/               build output (gitignored, published by Actions)
AUTHORS.md          who writes here (hand-maintained)
IDEAS.md            GENERATED — do not edit
CALENDAR.md         GENERATED — do not edit
```

## Build

```bash
npm run build     # generates site/ + IDEAS.md + CALENDAR.md
npm run serve     # preview at http://localhost:8000
```

No dependencies, by design — the Pages build must never fail on a registry
fetch. Keep it that way. If you find yourself wanting a markdown library or a
static-site framework, the honest fix is usually a few more lines in
`build/build.mjs`.

The generator validates as it goes and **fails the build** on: an unknown
`status`, a `scheduled` topic with no `publish_date`, a `published` topic with
no post body, two topics on the same date, or a malformed date. Those are all
signs the pipeline state is wrong, and a broken build is a cheaper way to find
out than a wrong site.

## House style

Field notes, not announcements. What worked on a real workload and what didn't;
decisions we'd defend and ones we've since reversed; guides concrete enough for
another team to follow. Specific over sweeping. No hype, no roadmap promises.

Design follows IBM Carbon: `#0f62fe` blue, `#161616` near-black, IBM Plex
Sans/Serif/Mono, 1312px max width. The look came from a prototype that was
signed off — match it rather than redesigning it.
