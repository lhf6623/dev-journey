import { getUrl } from "./util.js";
import leetcode_menu from "./leetcode_menu.js";
import mdbook_menu from "./mdbook_menu.js";
import { throttle } from "https://esm.sh/lodash-es@4.17.21";
import Cache from "./cache.js";

const THEME_KEY = "theme";
const DOCUMENT_TYPE = "document_type";
const TITLE = "title";
const mdbook = "mdbook";
const leetcode = "leetcode";
const dark = "dark";
const light = "light";

const _document_type = Cache.getItem(DOCUMENT_TYPE) ?? leetcode;
const _menus = _document_type === leetcode ? leetcode_menu : mdbook_menu;

// 读取系统主题
const sys_theme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? dark
  : light;

export const sys_store = $.stanz({
  /** 文档类型 */
  document_type: _document_type,
  /** 当前代码 */
  content: "",
  /** 加载 文档 状态 */
  loading: false,
  /** 菜单列表 */
  menus: _menus,
  /** 当前标题 */
  title: Cache.getItem(TITLE) || _menus[0],
  /** 显示菜单 */
  is_show_menu: true,
  /** 小屏 */
  is_small: false,
  /** 主题 */
  theme: Cache.getItem(THEME_KEY) ?? sys_theme,
});

export const changeDocumentType = (val) => {
  const is_md = val === mdbook;
  const _menu = is_md ? mdbook_menu : leetcode_menu;
  const _title = _menu[0];
  sys_store.document_type = val;
  sys_store.title = _title;
  sys_store.menus = _menu;

  Cache.setItem(TITLE, sys_store.title);
  Cache.setItem(DOCUMENT_TYPE, val);
};

function refreshTheme(theme = light) {
  document.startViewTransition(() => {
    document.documentElement.classList.toggle(dark, theme === dark);
  });

  Cache.setItem(THEME_KEY, theme);
}

refreshTheme(sys_store.theme);

// 监听浏览器颜色主题变化
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches }) => {
    sys_store.theme = matches ? dark : light;
    refreshTheme(sys_store.theme);
  });

// bug 赋值太快 watch 监听会丢失数据
const setShowMenu = throttle(() => {
  const width = window.innerWidth;
  sys_store.is_small = width < 960;
  sys_store.is_show_menu = width > 960;
}, 300);
setShowMenu();

// 监听浏览器窗口宽度变化
window.addEventListener("resize", setShowMenu);

async function setContent() {
  const { document_type, title } = sys_store;
  const type = document_type === leetcode ? leetcode : mdbook;

  if (title) {
    try {
      sys_store.loading = true;
      sys_store.content = await fetch(getUrl(`${type}/${title}`)).then((res) =>
        res.text()
      );
      Cache.setItem(TITLE, title);
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      sys_store.loading = false;
    }, 500);
  }
}

setContent();

sys_store.watchTick((watcher) => {
  if (watcher?.hasModified("title")) {
    setContent();
  }

  if (watcher.hasModified("theme")) {
    refreshTheme(sys_store.theme);
  }
});
