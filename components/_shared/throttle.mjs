/**
 * 简易节流（替代 lodash-es 的 throttle，去掉组件库对 esm.sh 的网络依赖）
 * 首次立即执行，冷却期内最多补执行一次（trailing）
 * @param {Function} fn
 * @param {number} wait 冷却毫秒
 */
export function throttle(fn, wait = 300) {
  let last = 0;
  let timer = null;

  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - last);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}
