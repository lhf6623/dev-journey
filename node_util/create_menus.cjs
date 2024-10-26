const fs = require("fs");
const path = require("path");

/**
 * 根据目标目录文件创建菜单文件，符合ES6模块
 * @param {String} target_url
 * @param {String} create_url
 */
function create_menu(target_url, create_url, handleMenus) {
  // 指定要读取的目录
  const directoryPath = path.join(__dirname, target_url); // 替换为你的目录路径
  const outputFilePath = path.join(__dirname, create_url); // 输出文件的路径

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
    const str_menu = `export default [\n  "${_files.join('",\n  "')}",\n];\n`;
    fs.writeFile(outputFilePath, str_menu, (err) => {
      if (err) {
        return console.error("无法写入文件: " + err);
      }
      console.log("文件名已写入 " + outputFilePath);
    });
  });
}
create_menu("../leetcode", "../src/js/leetcode_menu.js", (files) => {
  const menus = [...files]
    .sort((a, b) => {
      const [a_index] = a.split(".");
      const [b_index] = b.split(".");
      return Number(a_index) - Number(b_index);
    })
    .filter((item) => item.endsWith(".js"));
  return menus;
});
create_menu("../mdbook", "../src/js/mdbook_menu.js", (files) => {
  return files.filter((item) => item.endsWith(".md"));
});
