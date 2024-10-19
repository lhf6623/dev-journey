import { readFile } from "fs/promises";
import {
	defineConfig,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";
import { getDir } from "./js/nodeUtil";
import { presetOnu } from "@onu-ui/preset";

export default defineConfig({
	presets: [
		presetOnu({
			color: "#ccc",
		}),
	],
	cli: {
		entry: {
			patterns: ["component/*/*.html", "component/*.html", "index.html"],
			outFile: "css/uno.css",
		},
	},
	theme: {
		colors: {
			themeBgColor: "var(--theme-bg-color)",
			themeBaseText: "var(--text-base-color)",
			themeText: "var(--text-color)",
			menuBorder: "var(--border-color)",
			menuHoverColor: "var(--bg-hover-color)",
		},
	},
	preflights: [
		{
			getCSS: async () => {
				const theme = await readFile(`${getDir()}css/theme.css`, "utf-8");
				return theme;
			},
		},
	],
	shortcuts: {
		// 文本溢出显示省略号
		truncate: "overflow-hidden text-ellipsis whitespace-nowrap",
		"flex-center": "flex justify-center items-center",
		"flex-between": "flex justify-between items-center",
		// 按钮样式 hover active 两种状态
		"l-btn":
			"hover:bg-menu-hover-color !active:op-70 transition-all b-none bg-transparent cursor-pointer text-theme-base-text",
		"l-btn-disabled":
			"disabled:op-70 disabled:cursor-not-allowed disabled:bg-menu-hover-color",
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
});
