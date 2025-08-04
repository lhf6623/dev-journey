import { getUrl } from "../js/util.js";
import leetcode_menu from "../js/leetcode_menu.js";
import mdbook_menu from "../js/mdbook_menu.js";
import Cache from "../js/cache.js";

const THEME_KEY = "sys_theme";
const DOCUMENT_TYPE = "sys_document_type";
const TITLE = "sys_title";
const dark = "dark";
const light = "light";
export const mdbook = "mdbook";
export const leetcode = "leetcode";

const menuMap = {
  [leetcode]: leetcode_menu,
  [mdbook]: mdbook_menu,
};
const document_type = Cache.getItem(DOCUMENT_TYPE) ?? leetcode;
const menus = menuMap[document_type];

// 读取系统主题
const sys_theme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? dark
  : light;

export const sys_store = $.stanz({
  /** 文档类型 */
  document_type,
  /** 加载 文档 状态 */
  loading: false,
  /** 菜单列表 */
  menus,
  /** 当前标题 有后缀 */
  title: Cache.getItem(TITLE) || menus[0],
  /** 显示菜单 */
  is_show_menu: true,
  /** 小屏 */
  is_small: false,
  /** 主题 */
  theme: Cache.getItem(THEME_KEY) ?? sys_theme,
});
/** 处理文件后缀 */
export const handleFileSuffix = (textName) => {
  if (!textName) return "";
  // 统一把 其他未知的后缀去掉
  return textName.replace(/\.\w+$/, "");
};

export const setSysTitle = (title) => {
  sys_store.title = title;

  Cache.setItem(TITLE, title);
};

export const changeType = (type, file_name) => {

  if (sys_store.document_type === type) return;

  sys_store.menus = menuMap[type] ?? [];

  if (!menuMap[type]) {
    console.error(`未找到【${type}】的菜单`);
  }
  sys_store.document_type = type;

  sys_store.title = file_name ? file_name : sys_store.menus[0];

  Cache.setItem(TITLE, sys_store.title);
  Cache.setItem(DOCUMENT_TYPE, type);
};

export function refreshTheme(theme) {
  const _theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? dark
    : light;

  theme = !theme ? Cache.getItem(THEME_KEY) ?? _theme : theme;

  document.startViewTransition(() => {
    sys_store.theme = theme;
    Cache.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle(dark, theme === dark);
  });
}

export async function getContent() {
  const { document_type, title: file_name } = sys_store;
  const type = document_type === leetcode ? leetcode : mdbook;
  let content = "";
  if (file_name) {
    try {
      sys_store.loading = true;
      content = await fetch(getUrl(`${type}/${file_name}`)).then((res) =>
        res.text()
      );
    } catch (e) {
      console.error(e);
    }

    sys_store.loading = false;
  }
  return content;
}
