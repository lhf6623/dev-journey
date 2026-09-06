import Cache from "../js/cache.js";
import { getPlatform } from "../js/Keyboard.mjs";

const THEME = "SYSTEM_THEME";
export const dark = "dark";
export const light = "light";
export const system = "system";

// 读取系统主题
const sysTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? dark
  : light;

/** 壳 store：应用加载状态 + 主题 + 当前应用（l-header tab 高亮） */
export const sysStore = $.stanz({
  /** 应用加载中（l-micro 控制） */
  loading: false,
  /** 主题 */
  theme: Cache.getItem(THEME) ?? sysTheme,
  isMac: getPlatform() === "macOS",
  /** 当前挂载的应用 name（别名页 attached 设置） */
  activeApp: null,
});

export function refreshTheme(theme) {
  const localTheme = Cache.getItem(THEME);

  theme = theme ?? localTheme ?? system;
  sysStore.theme = theme;
  Cache.setItem(THEME, theme);
  function setTheme() {
    const schemeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const _theme = theme === system ? schemeTheme : theme;
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
