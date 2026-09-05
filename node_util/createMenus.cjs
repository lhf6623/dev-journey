const fs = require("fs");
const path = require("path");

/**
 * 根据目标目录文件创建菜单文件，符合ES6模块
 * @param {String} targetUrl
 * @param {String} createUrl
 */
function createMenu(targetUrl, createUrl, handleMenus) {
  // 指定要读取的目录
  const directoryPath = path.join(__dirname, targetUrl); // 替换为你的目录路径
  const outputFilePath = path.join(__dirname, createUrl); // 输出文件的路径

  // 读取目录
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error("无法读取目录: " + err);
    }
    let _files = files;
    if (handleMenus) {
      _files = handleMenus(files);
    }
    // 跟格式化样式保持一样
    const strMenu = `export default [\n  "${_files.join('",\n  "')}",\n];\n`;
    fs.writeFile(outputFilePath, strMenu, (err) => {
      if (err) {
        return console.error("无法写入文件: " + err);
      }
      console.log("文件名已写入 " + outputFilePath);
    });
  });
}
createMenu("../leetcode", "../src/js/leetcodeMenu.js", (files) => {
  const menus = [...files]
    .sort((a, b) => {
      const [aIndex] = a.split(".");
      const [bIndex] = b.split(".");
      return Number(aIndex) - Number(bIndex);
    })
    .filter((item) => item.endsWith(".js"));
  return menus;
});
createMenu("../mdbook", "../src/js/mdbookMenu.js", (files) => {
  return files.filter((item) => item.endsWith(".md"));
});
