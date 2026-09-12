/**
 * 监听 documentElement 的 class 变化，回调当前主题（"dark" | "light"）
 * 组件库内共享：库组件需要跟随宿主主题，但不直接依赖站点代码
 * @param {(theme: "dark" | "light") => void} fn
 * @returns {() => void} 取消监听
 */
export const watchHtmlTheme = (fn) => {
  const targetNode = document.documentElement;
  const getTheme = () =>
    targetNode.className.includes("dark") ? "dark" : "light";

  fn(getTheme());

  const config = {
    attributes: true, // 监听属性变化
    attributeFilter: ["class"], // 只监听 class 属性的变化
    childList: false, // 不监听子节点的增减
    subtree: false, // 不监听后代节点
  };
  const callback = (mutationsList) => {
    const { type, target } = mutationsList[0] || {};
    if (type === "attributes") {
      fn(target.className.includes("dark") ? "dark" : "light");
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  return () => {
    observer.disconnect();
  };
};
