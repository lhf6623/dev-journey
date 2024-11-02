import { v4 as uuidv4 } from "https://esm.sh/uuid@10.0.0";
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
/**
 * 获取浏览器显示的地址
 * @param {String} url
 */
export function getUrl(url) {
  const { origin, protocol } = location;
  if (protocol === "https:") {
    return `https://lhf6623.github.io/leetcode/${url}`;
  }
  return `${origin}/${url}`;
}
/**
 * 创建运行器
 * @returns
 */
export function createJsRunner() {
  let iframe, iframeDoc;
  const id = uuidv4();

  function createIframe() {
    const oldIframe = document.getElementById(id);

    if (oldIframe) {
      // 清除旧的iframe
      document.body.removeChild(oldIframe);
    }

    iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.id = id;
    document.body.appendChild(iframe);

    iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  }

  // 写入运行代码
  function writeCode(code) {
    createIframe();
    const _code = `
		<script>
		let consoleProxy = new Proxy(console, {
			get(target, property, receiver) {
				if (!(property in target)) {
					const message = 'console. '+ property +' is not a function'
					window.parent.postMessage({
						message,
						type: 'error',
						id: 123456
					}, '*');
					return target[property];
				}

				return function (...args) {
					window.parent.postMessage({
						message: args.toString(),
						type: property,
						id: 123456
					}, '*');
					// Reflect.get(target, property, receiver)(...args);
				};
			},
		});
		console = consoleProxy
		try {
			${code}
		} catch (error) {
			console.error(error.message);
		}
		<\/script>
		`;
    iframeDoc.write(_code);
  }

  function onMessage(fn) {
    window.addEventListener("message", (event) => {
      if (event.data.id === 123456) {
        fn(event.data);
      }
    });
  }
  return {
    writeCode,
    onMessage,
  };
}
/**
 * @typedef SplitOptions 拖动元素
 * @property {Object} a - 元素
 * @property {Array} a.els - 元素
 * @property {number} a.minWidth - 最小宽度
 * @property {number} a.defaultWidth - 默认宽度
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
    const el1_w_str = `calc(${left_width}% - ${midWidth}px)`;
    const el3_w_str = `calc(${100 - left_width}% - ${midWidth}px)`;

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
