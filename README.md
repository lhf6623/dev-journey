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
- 新增/修改项目后运行 `pnpm menu`（现同时生成 leetcode/mdbook/projects 三个菜单）

### npm 依赖使用

文档地址：[esm.sh](https://esm.sh/#docs)
