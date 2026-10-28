# 跑地图知识站 · site-knowledge

[English](README.en.md) · 中文

`learn.paobu.org` 的网站工程：九个固定主题、文章列表与详情、主题聚合、本站搜索、语言入口与本地 404。正文、来源和审阅数据来自 `running-knowledge`；共享布局、主题、路由与内容校验来自 `@paobu/core` 的版本化制品。

## 当前状态

- 知识站已部署到 GitHub Pages，线上地址为 `https://learn.paobu.org/`；Pages 与 HTTPS 已启用。
- 二十八个知识实体已于 2026-10-28 完成 **AI 辅助编辑审阅**并发布；每个实体有双语 `approve` 记录和匹配 contentDigest。审阅身份明确标注为 AI 辅助，不是独立或专业医学/营养审阅；限制见 site-www 的 [ai-review-report.md](../site-www/evidence/2026-10-28/review/ai-review-report.md)。
- 本地发布准备已建立：生产构建会生成 `CNAME`、`.nojekyll`、`robots.txt`、`sitemap.xml`、`release-manifest.json`、PWA manifest、`sw.js` 与离线页；`.github/workflows/pages.yml` 已成功部署，`https://learn.paobu.org/` 已启用 HTTPS。当前 56 实体生产构建中，知识站有 86 个静态页面、发布清单 82 页、Pagefind 56 条记录、sitemap 82 个 URL；生产知识可见 28 个实体（27 篇文章 + 术语表），另有 5 条学习路径，`pnpm check:production` 通过。
- 本站索引只覆盖知识站当前语言的文章；三站汇总搜索在主站提供。K1 批次（节奏/间歇、负荷与过度训练、高温高湿、鞋科技）已于 2026-10-28 推送并完成 Pages 复核，线上文章与本地构建的 56 条记录一致。

## 技术基线

- Node.js `>=22.23.4 <25`，pnpm 10.18.3，Astro 7.4.2，TypeScript 5.9.3。
- `output: 'static'`、尾斜杠目录输出，规范域名为 `https://learn.paobu.org`。
- Pagefind 1.5.2 在构建后生成本站索引。
- `@paobu/core` 0.2.14，来自 `vendor/paobu-core.tgz`；`core.lock.json` 记录制品 SHA-256 `1fcda15d29b7e1de0240ea8b6061f92fc8dc7887a2469c85a3011584bd2bcd89`。

## 目录

```text
src/pages/                [...locale] 首页、文章列表/详情、主题聚合、搜索与 404
src/lib/content.ts        本站内容加载（含预览开关）
src/lib/view.ts           主题文案与知识详情格式
scripts/sync-core.mjs     从 site-www/core-dist 校验并同步核心 tgz
scripts/postbuild.mjs     Pagefind 索引与静态输出检查
vendor/paobu-core.tgz     锁定的核心制品（gitignore，安装前由 core:sync 重建）
core.lock.json            制品版本与 SHA-256
content.lock.json         三内容仓库的本地树摘要锁
```

## 本地运行

六个工程应位于同一父目录。共享核心由 `site-www` 打包，子站只同步和安装制品：

```bash
# 先确保 site-www 已生成 core-dist/paobu-core-<version>.tgz
cd site-knowledge
pnpm core:sync
pnpm install
pnpm test:content
pnpm check
pnpm build
pnpm dev
```

- 开发：`http://localhost:4322`，语言入口 `/` 与 `/en/`。
- 预览构建：`pnpm preview`，`http://localhost:4422`。构建时跨站链接按实际加载的 `.env` 生成（当前指向开发端口），验证跳转需同时运行对应站点；生产构建必须显式覆盖三个来源，否则 `.env` 的 localhost 会进入 HTML。
- 构建：`pnpm build` 执行 Astro 静态构建和 Pagefind 后处理；内容校验失败会中止。
- 内容校验：`pnpm test:content`。
- 类型与 Astro 检查：`pnpm check`。
- 生产模式：`PREVIEW_UNREVIEWED=0 pnpm build` 生成发布文件；`pnpm check:production` 当前通过（28 个知识实体已发布）。
- 注意：本仓库的 `pnpm test` 目前没有测试文件；不要把空测试套件当作验证证据。

核心升级流程：在 `site-www` 运行 `pnpm core:pack`，在此运行 `pnpm core:sync && pnpm install --force`，确认 `core.lock.json` 与安装版本一致。不要改用 `workspace:*`，也不要复制 `packages/core` 源码。

内容目录可用 `PAOBU_REPOS_DIR` 指向父目录，或用 `KNOWLEDGE_CONTENT_DIR` 覆盖。生产构建必须确保实际生效的环境文件中 `PREVIEW_UNREVIEWED=0` 或未设置；本地 `.env` 当前为 `1`，发布前应修改或移除。

## 内容与主题

- 九个主主题：训练方法、跑步技术、恢复与疲劳、营养与补给、装备选择、健康与伤病、安全与环境、习惯与心理、跑步文化。
- 每篇文章只有一个主主题和若干辅助主题；主题聚合页只引用已发布正文，不复制内容。
- 文章正文不执行脚本，不使用 MDX、内联 HTML 或动态 import。
- 双语文章通过 `entityId` 配对；构建校验双语、来源、许可、审阅日期与内容摘要。格式化、翻译或重建不算复审。

## 内容锁

在交接包根目录运行：

```bash
node scripts/content-lock.mjs          # 重新生成三个站点的 content.lock.json
node scripts/content-lock.mjs --verify # 校验内容树未变化
```

`sha256-tree-v1` 覆盖三个内容仓库的 `content/`、`data/` 和 `assets/`。锁中的 `commit` 已固定为完整 SHA：`running-routes` `0cd00cda…`、`running-knowledge` `a879da16…`、`running-tools` `4a8a3885…`。锁用于本地可复现构建，不代替 Git。

## 外部配置与发布边界

- 站内链接使用真实静态路径，不依赖服务端 SSR、运行时秘密或自定义响应头。
- 跨子域链接使用 `PUBLIC_ROUTES_ORIGIN`、`PUBLIC_KNOWLEDGE_ORIGIN` 与 `PUBLIC_TOOLS_ORIGIN`；生产默认值在核心中，本地 `.env` 指向三个本地端口。
- GitHub 仓库、DNS 与 Pages 已配置：六个仓库位于 `paobuorg`，三站 Pages 已上线并启用 HTTPS。本仓库工作流使用 `PAOBU_CORE_ARTIFACT_URL`、`PAOBU_CORE_SHA256` 仓库变量；K1 批次线上文章已验证，证据见 site-www 的 [remote-status.json](../site-www/evidence/2026-10-28/release/remote-status.json)。

## 许可

- 网站代码：MIT。
- 知识与正文：`running-knowledge` 仓库许可；新写正文为 CC BY 4.0。
- 第三方来源、图片和引用片段保留各自权利。

最后核对日期：2026-10-28。
