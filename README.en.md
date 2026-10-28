# RunMap Learn · site-knowledge

[中文](README.md) · English

The site project for `learn.paobu.org`: nine fixed topics, article lists and detail pages, topic collections, local search, language entry points and a local 404. Articles, sources and review data come from `running-knowledge`; shared layouts, theme, routing and content validation come from the versioned `@paobu/core` artifact.

## Status

- The knowledge site is deployed on GitHub Pages at `https://learn.paobu.org/`; Pages and HTTPS are enabled.
- All twenty-eight knowledge entities were **AI-assisted editorially reviewed** and published on 2026-10-28; each has bilingual `approve` records and matching contentDigests. The reviewer is explicitly labelled AI-assisted, not independent or professional medical/nutrition review; limitations are in [ai-review-report.md](../site-www/evidence/2026-10-28/review/ai-review-report.md).
- Local release preparation exists: production builds emit `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml`, `release-manifest.json`, the PWA manifest, `sw.js` and an offline page. The Pages workflow has deployed successfully and `https://learn.paobu.org/` enforces HTTPS. In the current 56-entity production build the knowledge site has 88 static pages, 84 manifest pages, 56 Pagefind records and 84 sitemap URLs. Production knowledge shows 28 entities (27 articles plus a glossary), alongside five learning paths, and `pnpm check:production` passes.
- This site's index covers only knowledge articles in the current language. The aggregate three-site search lives on the main site. The K1 batch and the legal/tone update were completed on 2026-10-28; the knowledge site now has bilingual `/legal/` pages, article-level legal notices, and cleaned article copy without editorial-desk wording or legacy `/zh-CN/` links.

## Technical baseline

- Node.js `>=22.23.4 <25`, pnpm 10.18.3, Astro 7.4.2, TypeScript 5.9.3.
- `output: 'static'` with directory-style trailing slashes; canonical origin `https://learn.paobu.org`.
- Pagefind 1.5.2 builds the local index after the static build.
- `@paobu/core` 0.2.15, installed from `vendor/paobu-core.tgz`; `core.lock.json` records artifact SHA-256 `8e2645102a7a8ebcabf56db44ceb49c4d16df54478be489919979fb4a72eaeae`.

## Layout

```text
src/pages/                [...locale] home, article list/detail, topic collections, search and 404
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

- Development: `http://localhost:4322`, with `/` and `/en/` entry points.
- Built preview: `pnpm preview`, `http://localhost:4422`. Cross-site links are baked from the `.env` that is actually loaded (currently the development ports), so following them locally also needs those sites running; a production build must explicitly override all three origins, otherwise localhost values enter the HTML.
- Build: `pnpm build` runs the Astro static build and then Pagefind. Failed content validation stops it.
- Content validation: `pnpm test:content`.
- Type and Astro checks: `pnpm check`.
- Production mode: `PREVIEW_UNREVIEWED=0 pnpm build` emits the release files; `pnpm check:production` currently passes with all 28 knowledge entities published.
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

The `sha256-tree-v1` lock covers `content/`, `data/` and `assets/` in all three content repositories. Each lock pins a full commit SHA: `running-routes` `0cd00cda…`, `running-knowledge` `a879da16…`, `running-tools` `4a8a3885…`. The lock supports reproducible local builds and does not replace version control.

## External configuration and release boundary

- Internal links use real static paths and depend on no server-side rendering, runtime secret or custom response header.
- Cross-site links use `PUBLIC_ROUTES_ORIGIN`, `PUBLIC_KNOWLEDGE_ORIGIN` and `PUBLIC_TOOLS_ORIGIN`; production defaults live in the core and the local `.env` points to the three local ports.
- GitHub repositories, DNS and Pages are configured: the six repositories live under `paobuorg`, and all three sites are live on custom domains with HTTPS. This workflow uses the `PAOBU_CORE_ARTIFACT_URL` and `PAOBU_CORE_SHA256` repository variables. The K1 live articles are verified; evidence is in the site-www [remote-status.json](../site-www/evidence/2026-10-28/release/remote-status.json).

## Licence

- Site code: MIT.
- Knowledge articles: under the `running-knowledge` repository licence; new text is CC BY 4.0.
- Third-party sources, images and quoted excerpts keep their own terms.

Last checked: 2026-10-28.
