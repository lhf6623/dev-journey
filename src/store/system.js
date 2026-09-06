import { getUrl } from "../js/util.js";
import leetcodeMenu from "../js/leetcodeMenu.js";
import mdbookMenu from "../js/mdbookMenu.js";
import projectsMenu from "../js/projectsMenu.js";
import Cache from "../js/cache.js";
import { getPlatform } from "../js/Keyboard.mjs"

const THEME = "SYSTEM_THEME";
const DOCUMENT_TYPE = "SYS_DOCUMENT_TYPE";
const TITLE = "SYS_TITLE";
export const dark = "dark";
export const light = "light";
export const system = "system";
export const mdbook = "mdbook";
export const leetcode = "leetcode";
export const projects = "projects";

const menuMap = {
  [leetcode]: leetcodeMenu,
  [mdbook]: mdbookMenu,
  [projects]: projectsMenu,
};
const documentType = Cache.getItem(DOCUMENT_TYPE) ?? leetcode;
const menus = menuMap[documentType] ?? [];

/** 菜单首项标题：对象菜单（projects）取 name，字符串菜单原样返回 */
const getFirstMenuTitle = (list) => {
  const first = list?.[0];
  return typeof first === "object" && first !== null
    ? first.name ?? ""
    : first ?? "";
};

// 读取系统主题
const sysTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? dark
  : light;

export const sysStore = $.stanz({
  /** 文档类型 */
  documentType,
  /** 加载 文档 状态 */
  loading: false,
  /** 菜单列表 */
  menus,
  /** 当前标题 有后缀 */
  title: Cache.getItem(TITLE) || getFirstMenuTitle(menus),
  /** 显示菜单 */
  isShowMenu: true,
  /** 小屏 */
  isSmall: false,
  /** 主题 */
  theme: Cache.getItem(THEME) ?? sysTheme,
  isMac: getPlatform() === "macOS",
});
/** 处理文件后缀 */
export const handleFileSuffix = (textName) => {
  // 对象数组菜单（projects）不参与文件名截断，直接返回空字符串
  if (typeof textName !== "string") return "";
  if (!textName) return "";
  // 统一把 其他未知的后缀去掉
  return textName.replace(/\.\w+$/, "");
};

export const setSysTitle = (title) => {
  sysStore.title = title;

  Cache.setItem(TITLE, title);
};

export const changeType = (type, fileName) => {

  if (sysStore.documentType === type) return;

  sysStore.menus = menuMap[type] ?? [];

  if (!menuMap[type]) {
    console.error(`未找到【${type}】的菜单`);
  }
  sysStore.documentType = type;

  sysStore.title = fileName || getFirstMenuTitle(sysStore.menus);

  Cache.setItem(TITLE, sysStore.title);
  Cache.setItem(DOCUMENT_TYPE, type);
};

export function refreshTheme(theme) {
  const localTheme = Cache.getItem(THEME);

  theme = theme ?? localTheme ?? system
  sysStore.theme = theme
  Cache.setItem(THEME, theme);
  function setTheme() {
    const schemeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"

    const _theme = theme === system ? schemeTheme : theme
    document.documentElement.classList.toggle(dark, _theme === dark);
  }
  // Firefox 兼容性判断
  if (document.startViewTransition) {
    document.startViewTransition(setTheme);
  } else {
    setTheme();
  }
}

/** 系统主题跟随：主题为 system 时监听 OS 深浅色切换，返回取消函数 */
export function watchSystemTheme() {
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => {
    if (sysStore.theme === system) {
      refreshTheme();
    }
  };
  darkModeQuery.addEventListener("change", handler);
  return () => {
    darkModeQuery.removeEventListener("change", handler);
  };
}

export async function getContent() {
  const { documentType, title: fileName } = sysStore;
  const type = documentType === leetcode ? leetcode : mdbook;
  let content = "";
  if (fileName) {
    try {
      sysStore.loading = true;
      content = await fetch(getUrl(`${type}/${fileName}`)).then((res) =>
        res.text()
      );
    } catch (e) {
      console.error(e);
    }

    sysStore.loading = false;
  }
  return content;
}
