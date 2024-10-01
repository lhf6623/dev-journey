/**
 * 获取文件字节流
 * @param {string} url 目标地址
 * @returns {string}
 */
export async function getText(url, load) {
	const response = await load(url);

	const reader = response.body.getReader();
	let decoder = new TextDecoder();
	let content = "";
	try {
		while (true) {
			const { value, done } = await reader.read();
			content += decoder.decode(value);
			if (done) {
				break;
			}
		}
	} finally {
		reader.releaseLock();
	}
	return content;
}

/**
 * 把字符串转换成 dom 节点
 * @param {string} strHtml
 * @returns
 */
export function stringToDom(strHtml) {
	const parser = new DOMParser();
	return parser.parseFromString(strHtml, "text/html");
}

export function getUrl(url) {
	if (location.href.includes("https")) {
		return `https://lhf6623.github.io/leetcode/${url}`;
	}
	return `${location.origin}/${url}`;
}
