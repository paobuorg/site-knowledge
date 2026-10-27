# RunMap Learn · site-knowledge

[中文](README.md) · English

The site project for `learn.paobu.org`: nine fixed topics, article lists and detail pages, topic collections, local search, language entry points and a local 404. Articles, sources and review data come from `running-knowledge`; shared layouts, theme, routing and content validation come from the versioned `@paobu/core` artifact.

## Status

- The static site is implemented locally and passes its build checks. It is not a deployed site. All six public repositories have been pushed to GitHub; Pages and DNS are not enabled.
- All twenty-four knowledge entities were **AI-assisted editorially reviewed** and published on 2026-10-27; each has bilingual `approve` records and matching contentDigests. The reviewer is explicitly labelled AI-assisted, not independent or professional medical/nutrition review; limitations are in [ai-review-report.md](../site-www/evidence/2026-10-27/review/ai-review-report.md).
- Local release preparation exists: production builds emit `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml`, `release-manifest.json`, the PWA manifest, `sw.js` and an offline page. `.github/workflows/pages.yml` is defined but has not run on GitHub. Production knowledge shows 24 entities (23 articles plus a glossary), alongside five learning paths, and `pnpm check:production` passes.
- This site's index covers only knowledge articles in the current language. The aggregate three-site search lives on the main site.

## Technical baseline

- Node.js `>=22.23.4 <25`, pnpm 10.18.3, Astro 7.4.2, TypeScript 5.9.3.
- `output: 'static'` with directory-style trailing slashes; canonical origin `https://learn.paobu.org`.
- Pagefind 1.5.2 builds the local index after the static build.
- `@paobu/core` 0.2.13, installed from `vendor/paobu-core.tgz`; `core.lock.json` records artifact SHA-256 `b3e5b077614b661c0c553ef1b600386d9a946bef83a458afd0c0889f7a1efb03`.

## Layout

```text
src/pages/                [locale] home, article list/detail, topic collections, search and 404
src/lib/content.ts        Site content loading, including the preview switch
src/lib/view.ts           Topic copy and knowledge-detail formatting
scripts/sync-core.mjs     Verifies and syncs the core tgz from site-www/core-dist
scripts/postbuild.mjs     Pagefind index and static-output checks
vendor/paobu-core.tgz     Locked core artifact (gitignored, restored by core:sync before install)
core.lock.json            Artifact version and SHA-256
content.lock.json         Local source-tree digest lock for the three content repos
```

## Local use

The six projects should sit in the same parent directory. The shared core is packed by `site-www`; subsites only sync and install the artifact:

```bash
# Requires site-www to have produced core-dist/paobu-core-<version>.tgz
cd site-knowledge
pnpm core:sync
pnpm install
pnpm test:content
pnpm check
pnpm build
pnpm dev
```

- Development: `http://localhost:4322`, with `/zh-CN/` and `/en/` entry points.
- Built preview: `pnpm preview`, `http://localhost:4422`. Cross-site links are baked from the `.env` that is actually loaded (currently the development ports), so following them locally also needs those sites running; a production build must explicitly override all three origins, otherwise localhost values enter the HTML.
- Build: `pnpm build` runs the Astro static build and then Pagefind. Failed content validation stops it.
- Content validation: `pnpm test:content`.
- Type and Astro checks: `pnpm check`.
- Production mode: `PREVIEW_UNREVIEWED=0 pnpm build` emits the release files; `pnpm check:production` currently passes with all 24 knowledge entities published.
- Note: `pnpm test` currently has no test files in this repository. Do not present an empty suite as verification evidence.

Core upgrade: run `pnpm core:pack` in `site-www`, then `pnpm core:sync && pnpm install --force` here, and confirm that `core.lock.json` matches the installed version. Do not switch to `workspace:*` and do not copy `packages/core` source.

Content directories can be relocated with `PAOBU_REPOS_DIR`, or overridden with `KNOWLEDGE_CONTENT_DIR`. A production build must have `PREVIEW_UNREVIEWED=0` or unset in the environment file that is actually loaded. The local `.env` currently sets `1`; change or remove it before release.

## Content and topics

- Nine primary topics: training, technique, recovery, nutrition, gear, health, safety, habits and culture.
- Every article has one primary topic and several optional secondary topics. Topic pages reference published articles and do not copy their text.
- Articles do not execute scripts and do not use MDX, inline HTML or dynamic imports.
- Bilingual articles are paired by `entityId`; the build validates both languages, sources, licences, review dates and content digests. Formatting, translation or a rebuild does not count as re-review.

## Content locks

From the handoff root:

```bash
node scripts/content-lock.mjs          # regenerate content.lock.json for all three sites
node scripts/content-lock.mjs --verify # check that the content trees are unchanged
```

The `sha256-tree-v1` lock covers `content/`, `data/` and `assets/` in all three content repositories. There are no Git commits yet, so each lock records `commit: null`; replace it with a pinned full SHA once commits and remotes exist. The lock supports reproducible local builds and does not replace version control.

## External configuration and release boundary

- Internal links use real static paths and depend on no server-side rendering, runtime secret or custom response header.
- Cross-site links use `PUBLIC_ROUTES_ORIGIN`, `PUBLIC_KNOWLEDGE_ORIGIN` and `PUBLIC_TOOLS_ORIGIN`; production defaults live in the core and the local `.env` points to the three local ports.
- The GitHub owner, repository access, DNS and Pages settings are not available, so no workflow or deployment was created. Do not describe the local build as a live site.

## Licence

- Site code: MIT.
- Knowledge articles: under the `running-knowledge` repository licence; new text is CC BY 4.0.
- Third-party sources, images and quoted excerpts keep their own terms.

Last checked: 2026-10-27.
