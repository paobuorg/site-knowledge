# 跑起来知识站 · site-knowledge

[English](README.en.md) · 中文

`learn.paobu.org` 的网站工程：九个固定主题、文章列表与详情、主题聚合、本站搜索、语言入口与本地 404。知识正文、来源和审阅数据来自 `running-handbook/knowledge/`；共享布局、主题、路由与内容校验来自 `@paobu/core` 的版本化制品。

## 当前状态

- **2026-11-25 本地结构调整完成**：内容源从旧 `running-knowledge` 改为 `running-handbook`，核心从 `site-www/packages/core` 改为独立 `paobu-core` 制品。
- 本站内容门禁通过：知识实体 **90**，来源 **959**（三站共用同一内容门禁口径），claim **5,389**，工具算例 **43**；知识实体全部为已审阅状态。
- 本地生产构建：静态 HTML **211**，发布清单 **208** 页，Pagefind **180** 条，sitemap **208** 个 URL；`check:production` 通过（knowledge=90）。
- 本地 QA 通过：360 页整站抓取、Chromium UI 矩阵、性能预算、故障、轨迹、跨站与 PWA 检查。
- **线上 `https://learn.paobu.org/` 已发布 2026-11-25 新版**：由本仓 `main` 的 `76ad9b3` 构建并部署；中文与英文首页、文章页、搜索页和 208 个 sitemap URL 线上均返回 200。
- 共享核心 `@paobu/core@0.3.0`，制品 SHA-256 `e30e89f289ca7c4fab2a0941d6967c081af54b63741559651c2cdf6ec4a0d16e`。

## 技术基线

- Node.js `>=22.23.4 <25`，pnpm 10.18.3，Astro 7.4.2，TypeScript 5.9.3。
- `output: 'static'`、尾斜杠目录输出，规范域名 `https://learn.paobu.org`。
- Pagefind 1.5.2 在构建后生成本站索引。
- `@paobu/core` 0.3.0，来自 `vendor/paobu-core.tgz`；`core.lock.json` 记录同一 SHA-256。
- 本站只索引当前语言的文章；三站汇总搜索在主站提供。

## 目录

```text
src/pages/                [...locale] 首页、文章列表/详情、主题聚合、搜索与 404
src/lib/content.ts        本站内容加载（含预览开关）
src/lib/view.ts           主题文案与知识详情格式
scripts/sync-core.mjs     从 ../paobu-core/core-dist 校验并同步核心 tgz
scripts/postbuild.mjs     Pagefind 索引与静态输出检查
vendor/paobu-core.tgz     锁定的核心制品（gitignore，安装前由 core:sync 重建）
core.lock.json            核心制品版本与 SHA-256
content.lock.json         两内容仓库的本地树摘要锁
```

## 本地运行

六个工程位于同一父目录。先确保 `paobu-core` 已生成 `core-dist/paobu-core-0.3.0.tgz`：

```bash
cd paobu-core
node scripts/pack-core.mjs

cd ../site-knowledge
node scripts/sync-core.mjs
pnpm install
pnpm test:content
pnpm check
pnpm build
pnpm dev
```

- 开发：`http://localhost:4322`。
- 预览构建：`pnpm preview`，`http://localhost:4422`。
- 内容校验：`pnpm test:content`。
- 类型检查：`pnpm check`。
- 单元测试：`pnpm test`。

生产构建需显式设置三站来源与审阅开关：

```bash
PUBLIC_ROUTES_ORIGIN=https://paobu.org \
PUBLIC_KNOWLEDGE_ORIGIN=https://learn.paobu.org \
PUBLIC_TOOLS_ORIGIN=https://tools.paobu.org \
PREVIEW_UNREVIEWED=0 pnpm build
pnpm check:production
```

## 共享核心与内容锁

核心源码只在 `paobu-core` 维护。修改后在该仓运行 `node scripts/pack-core.mjs`，再在本仓运行 `node scripts/sync-core.mjs && pnpm install`。三站必须使用同一版本与 SHA-256；旧 tgz 保留用于回滚。

内容锁由交接包根目录的 `node scripts/content-lock.mjs` 生成，覆盖 `marathon-trail-running-races` 的 `content/`、`data/`、`assets/` 与 `running-handbook` 的 `knowledge/{content,data,assets}`、`tools/{content,data,assets}`。当前锁到路线仓 `7cc63ab7…`、handbook `1e008e39…`。

## 审阅与边界

- 知识实体为 **AI 辅助编辑审阅**，不是独立或专业医学、营养、教练审阅；页面只显示中性的“跑起来编辑部 / RunUp Editorial”。
- 健康类文章有就医边界、急症信号与不适用说明；不提供诊断或用药建议。
- 预览构建可显示未审阅横幅；生产构建必须 `PREVIEW_UNREVIEWED=0`。
- 线上已发布；六个仓库已在 `paobuorg` 建仓或改名并推送，Pages 从本仓 `main` 的 workflow 构建。

## 许可

- 网站代码：MIT。
- 知识内容：`running-handbook` 仓库许可，新写正文为 CC BY 4.0。
- 第三方依赖与字体保留各自许可。

最后核对日期：2026-11-25。
