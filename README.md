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

### projects 项目展示模式

projects/ 目录下每个子目录是一个独立小项目：

```
projects/<项目名>/
  ├── index.html    # 独立完整单页（自带 ofa.js 引入，不依赖 SPA）
  ├── cover.png     # 封面（可选，支持 png/jpg/webp，文件名固定 cover.*）
  └── meta.json     # 元信息（可选）：{ "title": "显示标题", "description": "卡片描述" }
```

- meta.json 缺省时 title 取目录名、description 为空
- 缺封面时卡片显示渐变占位（标题首字）
- 项目页内的 unocss 原子类由 `pnpm dev`/`pnpm build` 扫描 `projects/**/*.html` 生成，页面内引 `../../src/css/uno.css`
- 项目页引用站内资源一律用**相对路径**（如 `../../public/favicon.ico`、`../../src/css/uno.css`），不要用 `/` 开头的绝对路径——GitHub Pages 部署在 `/dev-journey/` 子路径下，绝对路径会 404
- 新增/修改项目后运行 `pnpm menu`（现同时生成 leetcode/mdbook/projects 三个菜单）

### projects 项目加载器约定（自研微前端机制）

SPA 内点击卡片不再整页跳转：路由到 `src/pages/project-detail.html?name=<项目名>`，由加载器组件 [src/component/l-project.html](src/component/l-project.html) 把 `projects/<name>/index.html` 的 body 节点按序注入加载器 open shadow root 内组合展示；`projects/<name>/index.html` 仍可独立打开（双形态）。

编写项目页必须遵守：

1. index.html 必须是完整单页：head 引 `../../src/css/public.css`、`../../src/css/uno.css`、`../../src/js/project-page.js`（共享脚本）与 ofa.js CDN；body 为页面内容，**布局类放在 body 内的容器 div 上**（被内嵌时注入的是 body 子节点，body 本身不进外壳）
2. 业务逻辑一律放进 l-m 加载的组件 html 文件（`<template component>`）。index.html 内嵌脚本（inline 或 src）除上述两个外会被加载器跳过并告警，不会执行
3. 组件 tag 全局唯一：组件文件经 l-m 加载会 `customElements.define` 全局注册，与外壳组件（l-header/l-menu/…）或其他项目重名会抛 `comp_registered`；建议用项目名前缀（如 `demo-app`）
4. 禁止依赖 document 级结构（document.body 追加节点、document 级查询）——被内嵌时内容位于加载器 shadow 内，document.body 不含项目节点
5. 相对路径（img/src/href/style url()）由加载器以项目 index.html 为基准重写为绝对地址，无需处理；l-m 的 src 必须用相对路径（以项目目录为基准）
6. 返回交互用 `window.projectPage.back()`（内嵌时调用加载器注册的回调返回项目列表，独立时 `history.back()`），不要直接调 `history.back()`
7. 主题由外壳统一管理（内嵌时 project-page.js 会自动跳过主题逻辑）；项目内不要自己改 documentElement 的 class
8. 项目内 `<a>` 跳转到项目自身其他页面会整页离开 SPA（可接受）；SPA 内导航用 `app.goto` 或 projectPage 事件
9. 新增 unocss 原子类/图标后运行 `pnpm dev`/`pnpm build`，并同步升级全仓库 `?v=` 版本号与 package.json 版本

### npm 依赖使用

文档地址：[esm.sh](https://esm.sh/#docs)
