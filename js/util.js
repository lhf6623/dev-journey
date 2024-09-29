/**
 * 获取文件字节流
 * @param {string} url 目标地址
 * @returns {string}
 */
export async function getText(url) {

  const response = await fetch(url)

  const reader = response.body.getReader()
  let decoder = new TextDecoder()
  let content = ''
  try {
    while (true) {
      const { value, done } = await reader.read()
      content += decoder.decode(value)
      if (done) {
        break
      }
    }
  } finally {
    reader.releaseLock()
  }
  return content
}

/**
 * 把字符串转换成 dom 节点
 * @param {string} strHtml 
 * @returns 
 */
export function stringToDom(strHtml) {

  const parser = new DOMParser();
  return parser.parseFromString(strHtml, 'text/html');
}