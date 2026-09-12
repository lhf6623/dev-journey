# components 组件库

站点（`apps/`）与页面共用的组件，集中在此目录，**不依赖本目录之外的任何仓库文件**，可整目录抽成独立仓库。

## 目录约定

```
components/
  manifest.js            # 组件清单（tag + 入口）
  tokens.css             # 主题变量（全库唯一来源）
  reset.css              # 重置样式（@unocss/reset/tailwind-compat 副本）
  ui.css / ui-icon.css   # UnoCSS 生成物（已提交，改动后 pnpm build）
  uno.shared.js          # 主题/规则/快捷类/图标集合（与站点共用）
  uno.config.js          # 本库 UnoCSS 配置（utilities）
  uno.config.icons.js    # 本库 UnoCSS 配置（icons）
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

## 宿主需要引入的样式

组件样式依赖下面三份；本站由 `src/css/public.css`（`@import tokens.css`）与页面/应用根的 `<link>` 提供：

```html
<link rel="stylesheet" href="components/tokens.css" />
<link rel="stylesheet" href="components/ui.css" />
<link rel="stylesheet" href="components/ui-icon.css" />
<!-- reset 视宿主是否已有全局重置而定 -->
<link rel="stylesheet" href="components/reset.css" />
```

> `tokens.css` 定义在 `html` 上的 CSS 自定义属性会穿透 shadow DOM 继承，`ui.css`/`ui-icon.css` 是普通规则，必须注入到每个 shadow root（本站由 `o-global-link` 与应用根模板内的 `<link>` 完成）。

## 使用

```html
<l-m src="./components/l-button/index.html"></l-m>
<l-button>按钮</l-button>
```

## 约定

1. 库内引用只用相对本目录的路径（`../l-button/index.html`、`../_shared/theme.mjs`），**禁止** `../../src/...`
2. 不读全局 store / `localStorage` / `document.body`；数据一律走 props + `emit`
3. 新增/修改后运行 `pnpm build` 重新生成 `ui.css`/`ui-icon.css`，并同步 `?v=` 与 `package.json` 版本
