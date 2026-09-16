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
