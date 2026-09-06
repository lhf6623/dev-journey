import pkg from "../../package.json" with { type: "json" };

export const { version, name } = pkg;

export const watchHtmlTheme = (fn) => {

  const targetNode = document.documentElement;
  const theme = targetNode.className.includes("dark") ? "dark" : "light"
  fn(theme);
  const config = {
    attributes: true, // 监听属性变化
    attributeFilter: ["class"], // 只监听class属性的变化
    childList: false, // 不监听子节点的增减
    subtree: false, // 不监听后代节点
  };
  const callback = (mutationsList) => {
    const { type, target } = mutationsList[0] || {};
    if (type === "attributes") {
      const theme = target.className.includes("dark") ? "dark" : "light"
      fn(theme);
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  return () => {
    observer.disconnect();
  };
}
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
