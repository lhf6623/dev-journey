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
/**
 * 扫描 projects/ 子目录，生成对象数组菜单（卡片网格数据源）
 * 每个项目目录：index.html（独立单页，必需）、cover.png/jpg/webp（封面，可选）、meta.json（可选）
 * @param {String} targetUrl projects 根目录（相对本文件的路径）
 * @param {String} createUrl 输出的菜单文件路径
 */
function createProjectsMenu(targetUrl, createUrl) {
  const directoryPath = path.join(__dirname, targetUrl);
  const outputFilePath = path.join(__dirname, createUrl);
  const coverExts = [".png", ".jpg", ".webp"];

  const menus = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith("."))
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))
    .map(({ name }) => {
      const dir = path.join(directoryPath, name);
      // 读 meta.json，缺省时 title 用目录名
      let title = name;
      let description = "";
      try {
        const meta = JSON.parse(
          fs.readFileSync(path.join(dir, "meta.json"), "utf-8")
        );
        title = meta.title || name;
        description = meta.description || "";
      } catch (e) {
        console.warn(`【${name}】meta.json 读取失败，使用目录名作为标题`);
      }
      // 封面按约定探测 cover.png/jpg/webp，只存文件名
      const coverExt = coverExts.find((ext) =>
        fs.existsSync(path.join(dir, `cover${ext}`))
      );
      return {
        name,
        title,
        description,
        cover: coverExt ? `cover${coverExt}` : "",
      };
    });

  // JSON.stringify 自动转义引号，输出合法 ESM，2 空格缩进与现有生成文件风格一致
  const strMenu = `export default ${JSON.stringify(menus, null, 2)};\n`;
  fs.writeFileSync(outputFilePath, strMenu);
  console.log("文件名已写入 " + outputFilePath);
}
createProjectsMenu("../projects", "../src/js/projectsMenu.js");
