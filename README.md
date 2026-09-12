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
- css 为 unocss 自动生成,组件会自动注入，页面要主动引入

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

站点与页面共用的组件集中在 [components/](components/)，**不依赖该目录之外的仓库文件**，为后续整目录抽成独立仓库做准备：

- 组件：`l-button`、`l-select`、`l-doc-menu`（菜单合并）、`l-doc-search`（搜索合并）、`l-console-list`、`l-editor`，以及 JS 类 `l-toast`；清单见 [components/manifest.js](components/manifest.js)
- 约定：库内只用相对本目录的路径；数据走 props + `emit`，不读全局 store / `document.body`；tag 全局唯一
- 样式：`components/tokens.css`（主题变量唯一来源，`public.css` 改为 `@import` 引入）、`components/reset.css`、`components/ui.css` + `components/ui-icon.css`（UnoCSS 生成物）
- 构建：`pnpm dev` / `pnpm build` 会同时生成站点与组件库两份 CSS；改动组件后需重跑并同步 `?v=` 与 `package.json` 版本

#### 验证

```shell
pnpm menu && pnpm build && node node_util/verify.mjs
```

[verify.mjs](node_util/verify.mjs) 用无头 Chrome 跑全量冒烟用例（深链 `#/<app>[/<sub>]`、旧链接重定向、内嵌/独立打开）；SPA 用例等 `data-app-ready` 稳定后再断言，不用固定 sleep。调试单个用例：`ONLY=<用例名子串> node node_util/verify.mjs`。

### npm 依赖使用

文档地址：[esm.sh](https://esm.sh/#docs)
