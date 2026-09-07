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

### 微前端架构（自研机制，两级组合）

外壳（index.html + header/主题/工具）与三个模式应用（[apps/leetcode](apps/leetcode/)、[apps/mdbook](apps/mdbook/)、[apps/projects](apps/projects/)）由自研微前端工具组合；projects 应用内的二级项目页由同一工具嵌套组合。

- 工具：[src/micro/](src/micro/)——`apps.json` 应用清单（header tab 由此生成）、`l-micro` 加载器（HTML-entry 组合）、`init.js` 共享双模式脚本
- 壳路由深链：`#/app/<name>`（物理别名页 [app/](app/)），二级深链 `#/app/projects?sub=<项目名>`
- 应用入口均为**完整 HTML 文档**（双形态：被壳组合展示 / 独立打开）

#### 应用编写约定

1. `apps/<name>/index.html` 完整单页：head 引 `../../src/css/public.css`、`../../src/css/uno.css`、`../../src/micro/init.js`（共享脚本）与 ofa.js CDN；body 为页面内容，**布局类放在 body 内的容器 div 上**（被内嵌时注入的是 body 子节点，body 本身不进外壳）
2. 业务逻辑一律放进 l-m 加载的组件 html 文件（`<template component>`）。index.html 内嵌脚本（inline 或 src）除上述两个外会被加载器跳过并告警，不会执行
3. 组件 tag 全局唯一：组件文件经 l-m 加载会 `customElements.define` 全局注册，重名会抛 `comp_registered`；建议用应用/项目名前缀（如 `demo-app`、`mdbook-menu`）
4. 禁止依赖 document 级结构（document.body 追加节点、document 级查询）——被内嵌时内容位于加载器 shadow 内
5. 相对路径（img/src/href/style url()）由加载器以入口文件为基准重写为绝对地址，无需处理；l-m 的 src 必须用相对路径
6. 返回交互用 `window.appCtx.back()`（内嵌时调用加载器注册的回调，独立时 `history.back()`）；**appCtx 在组件 attached 时捕获，不要在交互时活读**（嵌套加载器会覆盖全局）
7. 主题由外壳统一管理（内嵌时 init.js 会自动跳过主题逻辑）；应用内不要自己改 documentElement 的 class
8. `back` 是 ofa 页面/组件保留方法名，自定义返回方法用 `goBack`/`showList` 等命名
9. 组件目录（`apps/<name>/components/`）到仓库根的相对路径是 `../../../`，应用根是 `../`——写错层级会 404
10. 新增 unocss 原子类/图标后运行 `pnpm dev`/`pnpm build`，并同步升级全仓库 `?v=` 版本号与 package.json 版本

#### projects 项目展示

projects/ 目录下每个子目录是一个独立小项目（同工具嵌套组合的二级应用）：

```
projects/<项目名>/
  ├── index.html    # 独立完整单页（约定同应用编写约定）
  ├── cover.png     # 封面（可选，支持 png/jpg/webp，文件名固定 cover.*）
  └── meta.json     # 元信息（可选）：{ "title": "显示标题", "description": "卡片描述" }
```

- meta.json 缺省时 title 取目录名、description 为空；缺封面时卡片显示渐变占位（标题首字）
- 项目页引用站内资源一律用**相对路径**，不要用 `/` 开头的绝对路径——GitHub Pages 部署在 `/dev-journey/` 子路径下，绝对路径会 404
- 新增/修改后运行 `pnpm menu`（生成三个菜单到各 apps/*/ 目录）

#### 验证

```shell
pnpm menu && pnpm build && node node_util/verify.mjs
```

[verify.mjs](node_util/verify.mjs) 用无头 Chrome 跑全量冒烟用例（三个应用的深链/内嵌/独立打开形态）。

### npm 依赖使用

文档地址：[esm.sh](https://esm.sh/#docs)
