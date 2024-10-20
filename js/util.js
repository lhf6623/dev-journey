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
export function getUrl(url) {
	return `${location.protocol === "https:" ? "/leetcode/" : "/"}${url}`;
}

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
 *
 * @param {*} param0
 * @param {*} el1_defaultWidth
 */
export function Split([el1, el2, el3], el1_defaultWidth) {
	const { parentElement } = el1;
	let { width: parentWidth, left: parentLeft } =
		parentElement.getBoundingClientRect();

	const { width: midWidth } = el2.getBoundingClientRect();

	function mouse(event) {
		event.preventDefault();
		const { clientX } = event;
		const left = getInRange(clientX - parentLeft, parentWidth);
		const x = (left / parentWidth) * 100;

		setStyle(x);
	}

	const defaultWidth = getInRange(el1_defaultWidth ?? 50, 100);
	setStyle(defaultWidth);

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

		el1.style.width = el1_w_str;
		el3.style.width = el3_w_str;
	}
	el2.addEventListener("mousedown", (e) => {
		e.preventDefault();

		parentElement.classList.add("is-mouse");
		document.addEventListener("mousemove", mouse);
	});

	document.addEventListener("mouseup", () => {
		parentElement.classList.remove("is-mouse");
		document.removeEventListener("mousemove", mouse);
	});
}
