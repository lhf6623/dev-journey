#### 说明

unocss 单独使用，不搭配任何框架，使用 unocss cli 命令行工具。

#### 使用 npm 安装依赖

```cmd
npm install -D unocss @unocss/cli @unocss/reset
```

#### 配置 package.json

```json
{
  "type": "module",
  "version": "0.2.0",
  "scripts": {
    "dev": "unocss --watch --m",
    "build": "unocss --m"
  },
  "devDependencies": {
    "@unocss/cli": "^0.63.4",
    "unocss": "^0.63.4"
  },
  "dependencies": {
    "@unocss/reset": "^0.63.4"
  }
}
```

--watch 参数，监听文件变化

--m 参数，压缩样式

#### 配置 uno.config.js

```js
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
  presetUno,
  presetAttributify,
} from "unocss";

// 获取当前项目地址
function getDir() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, "./");
}
export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  cli: {
    entry: {
      // 匹配要自动生成的文件
      patterns: ["src/**/*.html", "index.html"],
      // 生成的css文件地址
      outFile: "css/uno.css",
    },
  },
  preflights: [
    {
      getCSS: async () => {
        const dir = getDir(); // 你项目地址
        // 把其他 css 文件写入生成的 uno.css 中
        const theme = await readFile(`${dir}css/theme.css`, "utf-8");
        return theme;
      },
    },
  ],
  // 快捷方式 组合多个 class
  shortcuts: {
    // 文本溢出显示省略号
    truncate: "overflow-hidden text-ellipsis whitespace-nowrap",
    "flex-center": "flex justify-center items-center",
    "flex-between": "flex justify-between items-center",
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
```
