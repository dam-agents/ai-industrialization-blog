# CI workflows — needs a human to commit these

These two workflow files belong at `.github/workflows/`, but the blog agent's
GitHub token has no `workflows` scope, so its push was rejected:

```
refusing to allow a GitHub App to create or update workflow
`.github/workflows/deploy.yml` without `workflows` permission
```

Nothing is broken — the site is built and live from the `gh-pages` branch, which
the agent updates with `./build/publish.sh`. Adding these just moves publishing
into CI so it happens automatically on push, and validates PRs.

**Anyone with push access can land them:** copy each block to the given path,
commit, push. Delete this file afterwards.

## 1. Pages setup (one-time, no file needed)

**Settings → Pages → Source: `Deploy from a branch` → `gh-pages` / `/ (root)`.**

That's all that's needed for hosting right now. Switch Source to
`GitHub Actions` only after adding `deploy.yml` below.

## 2. `.github/workflows/deploy.yml`

Builds and deploys on every push to `main`. **After adding this, set
Settings → Pages → Source to `GitHub Actions`** — otherwise the branch and the
workflow both try to publish.

```yaml
name: Deploy to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# Let a running deploy finish; queue at most one more.
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      # No `npm ci` — the generator has no dependencies, on purpose.
      - name: Build
        run: node build/build.mjs
      - name: Check generated docs are current
        run: |
          if ! git diff --quiet -- IDEAS.md CALENDAR.md; then
            echo "::error::IDEAS.md / CALENDAR.md are out of date. Run 'npm run build' and commit the result."
            git diff --stat -- IDEAS.md CALENDAR.md
            exit 1
          fi
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## 3. `.github/workflows/validate.yml`

Validates the topic pipeline on every PR — catches a scheduled topic with no
date, colliding publish dates, or stale generated docs
before they merge.

```yaml
name: Validate topics

on:
  pull_request:
  workflow_dispatch:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Validate the topic pipeline
        run: node build/build.mjs --check
      - name: Confirm the site builds and generated docs are committed
        run: |
          node build/build.mjs
          if ! git diff --quiet -- IDEAS.md CALENDAR.md; then
            echo "::error::IDEAS.md / CALENDAR.md are out of date. Run 'npm run build' and commit the result."
            git diff -- IDEAS.md CALENDAR.md
            exit 1
          fi
```

## Alternative: let the agent do it

Granting the agent's GitHub App the `workflows` permission would let it commit
these itself, now and in future. Either way is fine — the files above are the
whole change.
