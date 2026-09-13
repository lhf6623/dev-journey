import Cache from "../js/cache.js";
import { getPlatform } from "../../components/_shared/keyboard.mjs";

const THEME = "SYSTEM_THEME";
/** 与版本无关的主题镜像键：供各页面 <head> 的内联脚本同步读取，避免深色模式刷新白闪 */
export const THEME_MIRROR_KEY = "dev-journey-theme";
export const dark = "dark";
export const light = "light";
export const system = "system";

// 读取系统主题
const sysTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? dark
  : light;

/** 壳 store：主题 + 当前应用（l-header tab 高亮）；加载动画由 app-host 自己管 */
export const sysStore = $.stanz({
  /** 主题 */
  theme:
    Cache.getItem(THEME) ??
    localStorage.getItem(THEME_MIRROR_KEY) ??
    sysTheme,
  isMac: getPlatform() === "macOS",
  /** 当前挂载的应用 name（壳解析 hash 后设置） */
  activeApp: null,
});

export function refreshTheme(theme) {
  const localTheme =
    Cache.getItem(THEME) ?? localStorage.getItem(THEME_MIRROR_KEY);

  theme = theme ?? localTheme ?? system;
  sysStore.theme = theme;
  Cache.setItem(THEME, theme);
  localStorage.setItem(THEME_MIRROR_KEY, theme);

  const schemeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? dark
    : light;
  const target = theme === system ? schemeTheme : theme;
  const willChange =
    document.documentElement.classList.contains(dark) !== (target === dark);

  const setTheme = () => {
    document.documentElement.classList.toggle(dark, target === dark);
  };

  // 首屏已由 <head> 内联脚本同步套用主题，此时不会再变则跳过 View Transition
  if (willChange && document.startViewTransition) {
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
