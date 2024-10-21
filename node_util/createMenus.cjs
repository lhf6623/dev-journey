const fs = require("fs");
const path = require("path");

/**
 *
 * @param {String} target_url
 * @param {String} create_url
 */
function create_menu(target_url, create_url) {
  // 指定要读取的目录
  const directoryPath = path.join(__dirname, target_url); // 替换为你的目录路径
  const outputFilePath = path.join(__dirname, create_url); // 输出文件的路径

  // 读取目录
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error("无法读取目录: " + err);
    }

    // 将文件名写入 outputFilePath
    fs.writeFile(
      outputFilePath,
      `export default ['${files.join("',\n'")}']`,
      (err) => {
        if (err) {
          return console.error("无法写入文件: " + err);
        }
        console.log("文件名已写入 " + outputFilePath);
      }
    );
  });
}
create_menu("../leetcode", "../src/js/leetcode_menu.js");
create_menu("../mdbook", "../src/js/mdbook_menu.js");
