## [dev-journey](https://lhf6623.github.io/dev-journey)

### 介绍

个人知识仓库

### 开发环境

- leetcode 题库：vscode 的插件 LeetCode
- md 文档编写：vscode 的插件 Markdown All in One
- 服务器：vscode 的插件 Live Server
- js 代码热更新：使用 nodemon
  ```shell
  nodemon xxx.js
  ```
- css 由 unocss 生成，统一收在 [src/styles/](src/styles/) 并由加载器自动注入 document 与 shadow（页面不用手写 `<link>`）

  ```shell
  pnpm dev
  ```

- 压缩代码

  ```shell
  pnpm build
  ```

### 增加 leetcode、mdbook 文件或者 projects 项目后的操作

```shell
cd node_util
node createMenus.cjs
```

或者

```shell
pnpm menu
```

### 微前端架构（壳 + 注册表 + 统一契约）

外壳（[index.html](index.html) + [layout-shell.html](src/layout-shell.html) 的 header/主题/工具）与三个应用（[apps/leetcode](apps/leetcode/)、[apps/mdbook](apps/mdbook/)、[apps/projects](apps/projects/)）通过**应用注册表 + 统一 `mount` 契约**组合；projects 内的二级项目用同一契约嵌套。

- 内核 [src/micro/](src/micro/)：
  - `apps.json`：应用清单（header tab 由此生成）
  - `registry.js`：清单 → `{ ...meta, load: () => import("apps/<name>/index.js") }`，全站唯一事实源
  - `router.js`：壳路由 `#/<app>`、`#/<app>/<sub>`；旧链接 `#/app/<name>[/]?sub=<x>` 自动归一化重定向
  - `context.js`：`createCtx`（`back`/`navigate`/`onTheme`）+ ctx 注册表
  - `app-host.html`：`<app-host :name :sub>` 按注册表加载、注入 ctx、卸载、写就绪信号 `document.body[data-app-ready]`
  - `component-entry.js`：`mountComponent` 通用挂载（ofa 组件 + ctx）
  - `standalone.js`：独立打开形态入口
- 深链：`#/leetcode`、`#/mdbook`、`#/projects`、`#/projects/demo`
- 没有 HTML-entry 解析（无 fetch/DOMParser/路径重写/脚本白名单），也没有 `window.__devJourneyApp` / `window.appCtx` 全局

#### 应用编写约定

1. 每个应用是一个 ESM 模块 `apps/<name>/index.js`，导出 `mount(container, ctx)` 并返回 `unmount`：

   ```js
   import { mountComponent } from "../../src/micro/component-entry.js";
   const src = new URL("./components/<name>-app.html", import.meta.url).href;
   export async function mount(container, ctx) {
     return mountComponent(container, { ctx, tag: "<name>-app", src });
   }
   ```

2. `apps/<name>/index.html` 只是**独立打开的薄宿主**（引样式 + ofa.js，调 `mountStandalone("<name>", ...)`）；壳内嵌复用同一个 `mount`
3. 业务逻辑放 `<template component>` 组件文件（`apps/<name>/components/`）；组件 tag 全局唯一，建议应用/项目名前缀
4. 上下文经 `mount(container, ctx)` 显式传入。组件内取用：宿主元素上的 `data-ctx-id` 属性 + `getCtxById(id)`——**ofa 会丢弃外部挂在元素上的普通对象属性，且组件 `data` 不允许函数**
5. 组件内 `this` 不是 DOM 元素：宿主元素是 `this.ele`，shadow 查询用 `this.shadow.ele.querySelector(...)`
6. 返回交互用 `ctx.back()`（内嵌回上级路由，独立 `history.back()`）；`back` 是 ofa 保留方法名，自定义返回用 `goBack`/`showList` 等
7. 主题由外壳统一管理（独立打开时 `standalone.js` 跟随系统）；应用不要改 `documentElement` 的 class
8. 站内资源用相对路径，不要 `/` 开头（Pages 部署在 `/dev-journey/` 子路径）。应用根到仓库根是 `../../`，组件目录是 `../../../`
9. 新增 unocss 原子类/图标后运行 `pnpm dev`/`pnpm build`，并同步升级全仓库 `?v=` 版本号与 package.json 版本

#### projects 项目展示

projects/ 目录下每个子目录是一个独立小项目（与顶层应用同一 `mount` 契约，可被壳嵌套）：

```
projects/<项目名>/
  ├── index.js      # 契约入口：mount(container, ctx)（通常调 mountComponent）
  ├── index.html    # 独立打开薄宿主
  ├── <组件>.html    # ofa 组件（<template component>）
  ├── cover.png     # 封面（可选，支持 png/jpg/webp，文件名固定 cover.*）
  └── meta.json     # 元信息（可选）：{ "title": "显示标题", "description": "卡片描述" }
```

- 深链 `#/projects/<项目名>` 直达详情；点击卡片改壳路由（浏览器前进/后退可用）
- meta.json 缺省时 title 取目录名、description 为空；缺封面时卡片显示渐变占位（标题首字）
- 新增/修改后运行 `pnpm menu`（生成三个菜单到各 apps/*/ 目录）

#### 组件库（components/）

站点与页面共用的组件集中在 [components/](components/)：

- 组件：`l-button`、`l-select`、`l-doc-menu`（菜单合并）、`l-doc-search`（搜索合并）、`l-console-list`、`l-editor`，以及 JS 类 `l-toast`；清单见 [components/manifest.js](components/manifest.js)
- 约定：库内只用相对本目录的路径；数据走 props + `emit`，不读全局 store / `document.body`；tag 全局唯一
- 样式：组件不再自带样式文件，公共样式由 [src/styles/](src/styles/) 统一注入（见下节）；将来整目录抽仓时，把 `src/styles/` 的加载器与 `tokens.css` / `uno.shared.js` 复制一份进 `components/`

#### 样式（src/styles/ 统一加载）

所有 CSS 收在 [src/styles/](src/styles/)，由 [index.js](src/styles/index.js) 一个模块统一加载：

```
src/styles/
  index.js        # 加载器：installCommonStyles() / useStyles()
  boot.js         # 首屏引导（经典脚本）：同步套主题 + 加载动画，改一处即可
  manifest.js     # 公共样式清单（reset/tokens/base/uno）
  reset.css  tokens.css  base.css
  uno.shared.js   # UnoCSS 主题/规则/快捷类/图标集合（组件库共用）
  uno.css         # UnoCSS 生成物：工具类 + 图标合并（根 uno.config.js，扫描 src/apps/projects/components）
```

- 机制：把样式构造成 `CSSStyleSheet`，用 `adoptedStyleSheets` 注入 document **和所有 shadow root**（同一个 sheet 共享，只 fetch/parse 一次）；`attachShadow` 钩子保证后建的 shadow 自动带上
- 站点、应用、独立页都不再手写 `<link>`；入口调一次 `installCommonStyles()`
- **模块专用 CSS 放模块目录下**，由模块入口声明：`apps/mdbook/index.js` 传 `styles: [new URL("./highlightjs.css", import.meta.url).href]`，只进该模块的 shadow
- **首屏防闪 + 加载动画**：各入口 `<head>` 只引一行 `src/styles/boot.js`（经典脚本，同步执行才赶得上首帧）。它负责同步套用主题（读与版本无关的镜像键 `dev-journey-theme`）、用 `html` 伪元素画兜底底色与转圈动画，并在样式加载器写 `data-styles-loaded` 后收起动画（最短展示 300ms、5s 兜底）。契约：加载器写 `data-styles-loaded`，`boot.js` 写 `data-styles-ready`。逻辑只有一个文件，改一次即可；**不要并进 `system.js`**（ESM 是 deferred，赶不上首帧）
- 仅支持 constructable stylesheet 的现代浏览器（Chrome 73+ / Safari 16.4+ / Firefox 101+），不做降级
- **加载动画统一**：页面内用 `.dj-loading-mask` + `.dj-spinner`（定义在 `base.css`），几何/配色走 `--dj-spinner-*` 变量，而变量的唯一定义处是 `boot.js`——所以首屏动画和页面内遮罩自动一致，改尺寸只改 `boot.js` 一处。使用点：`app-host`（切应用）、`mdbook-app`（加载文档）、`projects-app`（挂载二级项目）；壳里不再有第二层遮罩
- 新增 unocss 原子类/图标后运行 `pnpm dev` / `pnpm build`，并同步升级全仓库 `?v=` 版本号与 package.json 版本

#### 外部依赖（vendor/）

站点运行只依赖本仓库的静态文件，第三方库全部本地化在 [vendor/](vendor/)（不再有 CDN 依赖）。
**版本的唯一来源是 [node_util/vendor.manifest.json](node_util/vendor.manifest.json)**（下面表格只是说明）：

| 库 | 版本 | 产物 | 引入方 |
|---|---|---|---|
| ofa.js | 4.7.0 | `ofa.min.js` | 所有入口页的 `<script src>`（运行时基座） |
| marked | 14.1.3 | `marked.esm.js` | mdbook（常驻） |
| marked-highlight | 2.2.0 | `marked-highlight.esm.js` | mdbook（常驻） |
| highlight.js | 11.10.0 | `highlight.min.js`（ESM，含全部语言） | mdbook（常驻） |
| html2canvas | 1.4.1 | `html2canvas.esm.js` | mdbook（导出 PDF 时才动态 `import()`） |
| jsPDF | 2.5.2 | `jspdf.umd.min.js`（UMD，依赖已打包） | mdbook（导出 PDF 时才加载脚本，取 `window.jspdf.jsPDF`） |

- `screenfull` 已删除（改用原生 Fullscreen API），`lodash-es` 的 `inRange` 已内联，`jspdf`/`html2canvas` 改为导出时懒加载（首屏不下载 ~700KB）

**升级依赖**（不用手抄 URL，也不用手动改仓库其它地方）：

```shell
# 1. 改 node_util/vendor.manifest.json 里对应条目的 version（URL 由 {version} 模板生成）
# 2. 重新下载并回写 sha256
pnpm vendor                 # 全部；也可 pnpm vendor marked 只更新匹配项
# 3. 回归（版本升级可能带 API 变更，mdbook/leetcode 用例会覆盖到）
pnpm vendor:check && node node_util/verify.mjs
```

- `pnpm vendor:check` 只校验 `vendor/` 文件存在且 sha256 与清单一致，不联网；改动 vendor 文件后如果忘了跑 `pnpm vendor`，这一步会报不一致
- 升级大版本时留意产物形态是否变了（例如某个库不再提供自包含 ESM，就要改用 UMD + 全局，参考 jsPDF 的引入方式）
- 引入方式若变化，需同步改 `apps/*/` 里的 import；清单里的 `usage` 字段记录了每个库的引入方

#### 验证

```shell
pnpm menu && pnpm build && node node_util/verify.mjs
```

[verify.mjs](node_util/verify.mjs) 用无头 Chrome 跑全量冒烟用例（深链 `#/<app>[/<sub>]`、旧链接重定向、内嵌/独立打开）；SPA 用例等 `data-app-ready` 稳定后再断言，不用固定 sleep。调试单个用例：`ONLY=<用例名子串> node node_util/verify.mjs`。

### npm 依赖使用

文档地址：[esm.sh](https://esm.sh/#docs)
