const fs = require('fs');
const path = require('path');

// 指定要读取的目录
const directoryPath = path.join(__dirname, '../questionBank'); // 替换为你的目录路径
const outputFilePath = path.join(__dirname, 'menusData.js'); // 输出文件的路径

// 读取目录
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('无法读取目录: ' + err);
  }

  // 将文件名写入 outputFilePath
  fs.writeFile(outputFilePath, `export default ['${files.join("',\n'")}']`, (err) => {
    if (err) {
      return console.error('无法写入文件: ' + err);
    }
    console.log('文件名已写入 ' + outputFilePath);
  });
});