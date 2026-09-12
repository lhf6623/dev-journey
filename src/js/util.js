import pkg from "../../package.json" with { type: "json" };

export const { version, name } = pkg;

// watchHtmlTheme 已迁至组件库：components/_shared/theme.mjs

/**
 * 获取浏览器显示的地址
 * @param {String} url 地址
 * @returns {String} 浏览器显示的地址
 */
export function getUrl(url) {
  const { origin, protocol } = location;
  if (protocol === "https:") {
    return `https://lhf6623.github.io/dev-journey/${url}`;
  }
  return `${origin}/${url}`;
}
