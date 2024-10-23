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

/**
 * @template T
 * @typedef Temp
 * @property {T} val
 */

/**
 * 文档类型
 * @type {Temp<mdbook | leetcode>}
 */
export const document_type = $.stanz({
  val: leetcode,
});

export const changeDocumentType = (val) => {
  const is_md = val === mdbook;
  const _menu = !is_md ? leetcode_menu : mdbook_menu;
  const _title = _menu[0];
  document_type.val = val;
  title.val = _title;
  menus.val = _menu;

  Cache.setItem(TITLE, title.val);
  Cache.setItem(DOCUMENT_TYPE, document_type.val);
};
/**
 * 当前标题
 * @type {Temp<string>}
 */
export const title = $.stanz({
  val: "",
});
/**
 * 当前代码
 * @type {Temp<string>}
 */
export const content = $.stanz({
  val: "",
});
/**
 * 加载 文档 状态
 * @type {Temp<boolean>}
 */
export const loading = $.stanz({
  val: false,
});
/**
 * 菜单列表
 * @type {Temp<string[]>}
 */
export const menus = $.stanz({
  val: [],
});
/**
 * 显示菜单
 * @type {Temp<boolean>}
 */
export const is_show_menu = $.stanz({
  val: true,
});
/**
 * 小屏
 * @type {Temp<boolean>}
 */
export const is_small = $.stanz({
  val: false,
});
/**
 * 主题
 * @type {Temp<light | dark>}
 */
export const theme = $.stanz({
  val: light,
});

function refreshTheme(theme = light) {
  document.startViewTransition(() => {
    document.documentElement.classList.toggle(dark, theme === dark);
  });

  Cache.setItem(THEME_KEY, theme);
}

function initTheme() {
  // 读取系统主题
  const os_theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? dark
    : light;
  // 读取本地主题
  const _theme = Cache.getItem(THEME_KEY) ?? os_theme;

  refreshTheme(_theme);

  // 监听浏览器颜色主题变化
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches }) => {
      theme.val = matches ? dark : light;
      refreshTheme(theme.val);
    });
  theme.val = _theme;

  theme.watch((data) => {
    refreshTheme(data.value);
  });
}
initTheme();

// bug 赋值太快 watch 监听会丢失数据
const setShowMenu = throttle(() => {
  const width = window.innerWidth;
  is_small.val = width < 960;
  is_show_menu.val = width > 960;
}, 300);
setShowMenu();

// 监听浏览器窗口宽度变化
window.addEventListener("resize", setShowMenu);

async function setContent() {
  const type = document_type.val === leetcode ? leetcode : mdbook;

  if (title.val) {
    try {
      loading.val = true;
      content.val = await fetch(getUrl(`${type}/${title.val}`)).then((res) =>
        res.text()
      );
      Cache.setItem(TITLE, title.val);
    } catch (e) {
      console.error(e);
    }

    loading.val = false;
  }
}
function init_content() {
  const _document_type = Cache.getItem(DOCUMENT_TYPE) ?? leetcode;
  menus.val = _document_type === leetcode ? leetcode_menu : mdbook_menu;
  const _title = Cache.getItem(TITLE) ?? menus.val[0];

  title.val = _title;
  document_type.val = _document_type;

  setContent();

  Cache.setItem(TITLE, _title);
  Cache.setItem(DOCUMENT_TYPE, _document_type);
}
init_content();

title.watchTick(setContent);
