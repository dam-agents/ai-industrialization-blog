# AI Industrialization Blog

The public blog for the AI Industrialization team at IBM Research.

This repo contains the site and the workflow for taking topics from idea → approved → scheduled → published.

| | |
|---|---|
| Topic ideas | **[IDEAS.md](IDEAS.md)** |
| Publishing calendar | **[CALENDAR.md](CALENDAR.md)** |

## Suggesting a topic

Open an issue with the **Blog topic proposal** template, or add a file to `content/topics/<slug>.md` with `status: idea` and open a PR.

## Publishing workflow

```text
idea ──────► approved ──────► scheduled ──────► published
```

- **`idea`** — proposed topic
- **`approved`** — selected for development
- **`scheduled`** — has an author, draft, and publish date
- **`published`** — live on the site
- **`declined`** — won't be published

The topic files in `content/topics/` are the source of truth. `IDEAS.md` and `CALENDAR.md` are generated from them.

## Building

```bash
npm run build     # build the site and generated content
npm run check     # validate content
npm run serve     # preview locally
```

Edit `content/`, not the generated files.

## Layout

```text
content/topics/     topic and publishing metadata
content/posts/      published posts
content/site.json   site-wide content
build/              site generator
site/               generated site
```

## Publishing

The site is published to GitHub Pages from the `gh-pages` branch.

```bash
./build/publish.sh
```
