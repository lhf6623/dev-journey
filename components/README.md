# components 组件库

站点（`apps/`）与页面共用的组件集中在此目录。**当前样式"寄生"在站点**：公共样式由 [src/styles/](../src/styles/) 的加载器统一注入（见下）。将来整目录抽成独立仓库时，把 `src/styles/` 的 `index.js`、`manifest.js`、`tokens.css`、`reset.css`、`uno.shared.js` 与两个 uno 配置复制一份进 `components/` 即可。

## 目录约定

```
components/
  manifest.js            # 组件清单（tag + 入口）
  _shared/               # 库内共享工具（不对外导出）
  <组件名>/index.html    # 自定义元素组件（<template component>）
```

## 组件清单

| tag | 入口 | 说明 |
|---|---|---|
| `l-button` | `l-button/index.html` | 按钮 |
| `l-select` | `l-select/index.html` | 下拉选择 |
| `l-doc-menu` | `l-doc-menu/index.html` | 文档菜单（props: `menus`/`title`，事件 `toggle`） |
| `l-doc-search` | `l-doc-search/index.html` | 文档搜索（props: `menus`/`suffix`，事件 `select`） |
| `l-console-list` | `l-console-list/index.html` | 日志面板（props: `logList`，事件 `clear`） |
| `l-editor` | `l-editor/index.html` | CodeMirror 编辑器（props: `code`/`updateCode`，事件 `load`/`keydown`/`change`） |
| `l-toast` | `l-toast/index.mjs` | JS 类，`new Toast(容器, maxCount)` |

## 样式

组件不携带自己的样式文件，依赖宿主提供的公共样式（`reset` / `tokens` / `base` / `uno`）：

- 本站由 [src/styles/index.js](../src/styles/index.js) 的 `installCommonStyles()` 构造 `CSSStyleSheet`，用 `adoptedStyleSheets` 注入 document 与**所有 shadow root**——组件不用写 `<link>`，也不用手动注入。
- `tokens.css` 的 CSS 自定义属性会穿透 shadow 继承；`uno.css`（工具类 + 图标）是普通规则，由加载器逐 shadow 注入。
- 独立 demo：[l-button/demo.html](l-button/demo.html) 直接 `import { installCommonStyles } from "../../src/styles/index.js"`。
- 模块专用样式不放在这里：它跟着"模块"（应用/项目）走，由模块入口用 `mountComponent(..., { styles: [...] })` 声明。

## 使用

```html
<l-m src="./components/l-button/index.html"></l-m>
<l-button>按钮</l-button>
```

## 约定

1. 库内引用只用相对本目录的路径（`../l-button/index.html`、`../_shared/theme.mjs`），**禁止** `../../src/...`
2. 不读全局 store / `localStorage` / `document.body`；数据一律走 props + `emit`
3. 不写 `<link>`；样式依赖宿主加载器
4. 新增/修改后运行 `pnpm build`（UnoCSS 统一扫描 `components/**`），并同步 `package.json` 版本
