# AI Industrialization Blog

The public blog for the AI Industrialization team at IBM Research, and the single
place blog topics are **proposed, approved, and scheduled**.

Two things live here:

1. **The site** — static HTML built from `content/`, published to GitHub Pages.
2. **The pipeline** — every topic is a file in `content/topics/`, moving from
   idea → approved → scheduled → published. Leadership approves; nothing reaches
   the public site before that.

| | |
|---|---|
| Topic ideas | **[IDEAS.md](IDEAS.md)** |
| Publishing calendar | **[CALENDAR.md](CALENDAR.md)** |
| Who writes here | **[AUTHORS.md](AUTHORS.md)** |
| Working agreements | **[CLAUDE.md](CLAUDE.md)** |

## Suggesting a topic

Open an issue with the **Blog topic proposal** template. Or, if you'd rather work
in git, add a file to `content/topics/<slug>.md` with `status: idea` and open a
PR. Either way it lands in [IDEAS.md](IDEAS.md) awaiting leadership review.

You can also just ask `@dam` in the blog channel — it'll write the file for you.

## How a topic becomes a post

```
idea ──────► approved ──────► scheduled ──────► published
     leadership      + author       + post body
      approves       + a date       written
```

- **`idea`** — proposed, not reviewed. In `IDEAS.md`. Not on the site.
- **`approved`** — leadership said yes, no date yet. In `IDEAS.md` and
  `CALENDAR.md`.
- **`scheduled`** — has a `publish_date` and an author. Shows on the public site
  as **"Coming soon"**.
- **`published`** — live on the site.
- **`declined`** — leadership said no. Kept, with the reasoning.

Only leadership moves a topic to `approved` or `declined`, and the approval is
recorded in the file (`approved_by`, `approved_on`). The build fails if an
approved topic has no approver — attribution isn't optional.

**Target cadence: one post every two weeks.** More is better. The build warns
when fewer than two posts are scheduled in the next four weeks.

## Building

```bash
npm run build     # site/ + IDEAS.md + CALENDAR.md
npm run check     # validate topic files, write nothing
npm run serve     # preview at http://localhost:8000
```

No dependencies and no network access — the Pages build can't fail on a registry
fetch. `IDEAS.md` and `CALENDAR.md` are generated; edit `content/topics/` and
rebuild. CI checks they're current.

The build **fails** on an unknown status, a scheduled topic with no date, a
published topic with no body, two posts on the same date, a malformed date, or an
unattributed approval. All of those mean the pipeline state is wrong, and a red
build is a cheaper way to find out than a wrong site.

## Layout

```
content/topics/     one file per topic — source of truth for the pipeline
content/posts/      post bodies, filename matches the topic slug
content/site.json   mission, capabilities, principles — the non-post copy
build/build.mjs     the generator
build/styles.css    Carbon-derived styles, ported from the approved prototype
site/              build output (gitignored)
```

## Deploying

The site is served from the **`gh-pages`** branch, which holds only generated
output. To publish the current `main`:

```bash
./build/publish.sh
```

One-time setup: **Settings → Pages → Source → `Deploy from a branch` →
`gh-pages` / `/ (root)`**.

> **Deploying isn't automated yet.** The CI workflows that would build and
> deploy on push couldn't be committed — the agent's GitHub token has no
> `workflows` scope. The two files are ready to paste in
> **[docs/CI-WORKFLOWS.md](docs/CI-WORKFLOWS.md)**; anyone with push access can
> land them in a minute, and then this script is no longer needed.
