import { inRange } from "https://esm.sh/lodash-es@4.17.21";
import pkg from "../../package.json" with { type: "json" };
import dayjs from "https://esm.sh/dayjs@1.11.13";

export const { version, name } = pkg;
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
/**
 * 获取浏览器显示的地址
 * @param {String} url
 */
export function getUrl(url) {
  const { origin, protocol } = location;
  if (protocol === "https:") {
    return `https://lhf6623.github.io/dev-journey/${url}`;
  }
  return `${origin}/${url}`;
}
/**
 * 创建运行器
 * @returns
 */
export function createJsRunner(fn) {
  let iframe, iframeDoc;
  const id = crypto.randomUUID();

  function createIframe() {

    if (iframe) {
      document.body.removeChild(iframe);
    }

    iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = `about:blank`; // 或同源 URL
    iframe.id = id;
    document.body.appendChild(iframe);

    iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    return new Promise(resolve => {
      iframe.onload = () => {
        resolve(true);
      }
    })
  }

  // 写入运行代码
  async function writeCode(code) {
    await createIframe()
    const _code = `<script id='${id}'>
      const id = '${id}';
      console = new Proxy(console, {
        get(target, prop) {
          if (typeof target[prop] === "function") {
            return function (...args) {
              const info = args
                .map((item) => {
                  // object null array
                  if (typeof item === "object") {
                    return JSON.stringify(item, (key, value) => {
                      return value === undefined ? "undefined" : value;
                    });
                  }
                  if (item === undefined) {
                    return 'undefined';
                  }
                  if(typeof item === 'string' && item.trim() === '') {
                    return '""';
                  }
                  // BigInt
                  if(typeof item === 'bigint') {
                    return item.toString() + 'n';
                  }
                  // symbol function number
                  return item.toString();
                })
                .join(" ");
              
              window.parent.postMessage({
                type: prop,
                info: info,
                source: id,
                time: Date.now()
              }, '*');
              return target[prop].apply(target, args);
            };
          }
          return target[prop];
        },
      });
      try {
        ${code}
      } catch (error) {
        console.error(error.message);
      }
		<\/script>`;
    iframeDoc.write(_code);
  }

  window.addEventListener("message", fn);
  // 移除监听
  function onDestroy() {
    window.removeEventListener("message", fn);
    // 移除iframe
    document.body.removeChild(iframe);
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

  function setStyle(left_width) {
    // 百分百
    const el1_w_str = `calc(${left_width}% - ${midWidth / 2}px)`;
    const el3_w_str = `calc(${100 - left_width}% - ${midWidth / 2}px)`;

    el1.style.setProperty("width", el1_w_str);
    el3.style.setProperty("width", el3_w_str);
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
