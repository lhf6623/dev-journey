- 使用 npm 安装 unocss @unocss/cli

```shell
npm install -D unocss @unocss/cli
```

- 配置 uno.config.js

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
			patterns: ["index.html"],
			// 生成的css文件
			outFile: "css/uno.css",
		},
	},
	preflights: [
		{
			getCSS: async () => {
				// 把其他 css 文件写入生成的 uno.css 中
				const theme = await readFile(`${getDir()}css/theme.css`, "utf-8");
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
