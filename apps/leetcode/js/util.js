// leetcode 应用私有工具：运行器与拖动分栏（自 src/js/util.js 拷贝，P3 壳瘦身时删原函数）
import { inRange } from "https://esm.sh/lodash-es@4.17.21";

/**
 * 获取开始到结束的值，如果大于或小于 start 或 end，则返回 start 或 end
 * @param {Number} start
 * @param {Number} end
 * @param {Number} value
 * @returns {Number}
 */
function getInRange(value, start, end) {
  if (end === undefined) {
    return getInRange(value, 0, start + 1);
  }
  if (inRange(value, start, end)) {
    return value;
  } else if (value < start) {
    return start;
  }
  return end;
}

function proxyConsole(id) {
  // 循环结构需要剔除
  const loopObject = new Map();
  function anyToString(arr, space = 0) {
    // 空格
    space += 2;

    return arr.map((item) => {
      if (item === null) return "null"
      if (item === undefined) return "undefined"
      if (item instanceof Map) {
        if (item.size === 0) return "{}"
        return anyToString([Object.fromEntries(item)], space - 2)
      }
      if (item instanceof Set) {
        if (item.size === 0) return "[]"
        return anyToString([Array.from(item)], space)
      }
      if (Array.isArray(item)) {
        if (item.length === 0) return "[]"
        return `[${item.map((arr) => anyToString([arr], space))}]`
      }
      if (typeof item === 'bigint') {
        return item.toString() + 'n';
      }
      if (typeof item === 'symbol') {
        return 'Symbol'
      }
      if (typeof item === "object") {
        // 判断空对象
        if (Object.keys(item).length === 0) return "{}"

        if (loopObject.has(item)) return "循环引用";
        loopObject.set(item, true);
        const spaceString = Array.from({ length: space }).fill(' ').join('');
        const lastSpaceString = Array.from({ length: space - 2 }).fill(' ').join('');
        return `{\n${Object.keys(item).map(key => `${spaceString}${key}: ${anyToString([item[key]], space)}`).join(', \n')}\n${lastSpaceString}}`
      }

      // function number
      return item;
    }).join(", ");
  }
  const timers = new Map();
  const counters = new Map();
  console = new Proxy(console, {
    get(target, prop) {
      if (typeof target[prop] === "function") {
        return function (...args) {
          let info = anyToString(args)

          if (prop === "time") {
            const label = args[0] || "default";
            timers.set(label, performance.now());
            return
          } else if (prop === "timeEnd") {
            const label = args[0] || "default";
            if (timers.has(label)) {
              const elapsed = performance.now() - timers.get(label);
              timers.delete(label);
              info = `${label}: ${elapsed.toFixed(2)} ms`;
            } else {
              info = `${label}: 计时器不存在`;
            }
          } else if (prop === "count") {
            const label = args[0] || "default";
            const count = (counters.get(label) || 0) + 1;
            counters.set(label, count);
            info = `${label}: ${count}`;
          } else if (prop === "countReset") {
            const label = args[0] || "default";
            counters.set(label, 0);
            return;
          }

          if (id) {
            window.parent.postMessage({
              type: prop,
              info: info,
              source: id,
              time: Date.now()
            }, '*');

          }
          // return target[prop].apply(target, args);
        };
      }
      return target[prop];
    },
  });
}

/**
 * 创建运行器
 * @returns
 */
export function createJsRunner(fn) {
  let iframe;
  const id = crypto.randomUUID();

  function createIframe() {

    if (iframe) {
      document.body.removeChild(iframe);
    }

    iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = `about:blank`; // 或同源 URL
    iframe.id = id;

    return new Promise(resolve => {
      setTimeout(() => {
        iframe.onload = () => {

          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          resolve(iframeDoc)
        };

        document.body.appendChild(iframe);
      }, 100);
    })
  }

  // 写入运行代码
  async function writeCode(code) {
    const iframeDoc = await createIframe()

    const runCode = `
      const id = '${id}';
      ${proxyConsole.toString()}
      proxyConsole(id);

      try {
        ${code}
      } catch (e) {
        console.error(e.message);
      }
    `;
    const script = document.createElement("script");
    script.textContent = runCode;
    iframeDoc.body.appendChild(script);
  }

  window.addEventListener("message", fn);
  // 移除监听
  function onDestroy() {
    window.removeEventListener("message", fn);
    // 移除iframe
    iframe && document.body.removeChild(iframe);
  }

  return {
    writeCode,
    onDestroy,
    id
  };
}
/**
 * @typedef SplitOptions 拖动元素
 * @property {Object} opt - 元素
 * @property {Array} opt.els - 元素
 * @property {number} opt.minWidth - 最小宽度
 * @property {number} opt.defaultWidth - 左边节点默认宽度
 */

/**
 *
 * @param {SplitOptions} opt
 */
export function Split(opt) {
  const { els, minWidth = 10, defaultWidth = 66 } = opt;
  const [el1, el2, el3] = els;

  const { parentElement } = el1;
  let { width: parentWidth, left: parentLeft } =
    parentElement.getBoundingClientRect();

  const { width: midWidth } = el2.getBoundingClientRect();

  function mouse(event) {
    event.preventDefault();
    const { clientX } = event;
    const left = getInRange(clientX - parentLeft, parentWidth);
    const x = (left / parentWidth) * 100;
    if (100 - minWidth >= x && x >= minWidth) {
      setStyle(x);
    }
  }

  const _defaultWidth = getInRange(defaultWidth ?? 50, 100 - minWidth);
  setStyle(_defaultWidth);

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.target === parentElement) {
        const { width, left } = entry.target.getBoundingClientRect();

        parentWidth = width;
        parentLeft = left;
      }
    }
  });

  resizeObserver.observe(parentElement);

  function setStyle(leftWidth) {
    // 百分百
    const el1WStr = `calc(${leftWidth}% - ${midWidth / 2}px)`;
    const el3WStr = `calc(${100 - leftWidth}% - ${midWidth / 2}px)`;

    el1.style.setProperty("width", el1WStr);
    el3.style.setProperty("width", el3WStr);
  }

  el2.addEventListener("mousedown", (e) => {
    e.preventDefault();
    parentElement.classList.add("cursor-col-resize");
    document.addEventListener("mousemove", mouse);
  });

  document.addEventListener("mouseup", () => {
    parentElement.classList.remove("cursor-col-resize");
    document.removeEventListener("mousemove", mouse);
  });
}
