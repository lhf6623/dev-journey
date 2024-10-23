## 在 CommonJS 模块中使用

要开启 CommonJS 模块，需要在 package.json 文件中添加字段
`"type": "ccommonjs"`， 或者省略 **type** 字段

**\_\_dirname** 和 **\_\_filename** 是 Node.js 中的两个全局变量，分别用于获取当前文件的目录路径和文件路径。例如：

```javascript
// 假设你在 /Users/example/project/src/index.js 文件中运行这段代码

console.log(__dirname); // 输出：/Users/example/project/src

console.log(__filename); // 输出：/Users/example/project/src/index.js
```

- 在不是 Node.js 环境下，这两个变量的值为 undefined。

## 在 ES6 模块中使用

要开启 ES6 模块，需要在 package.json 文件中添加字段
`"type": "module"`

```javascript
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

## 在浏览器环境中使用

```html
<!-- 只能在服务器中运行，静态资源文件中无法运行，vs code中安装 live server 插件 -->
<script type="module">
  console.log(import.meta.url); // 输出为服务器地址
</script>
```
