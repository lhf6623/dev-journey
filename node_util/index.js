import path from "path";
import { fileURLToPath } from "url";
/**
 * 获取当前文件所在目录
 * @returns {String}
 */
export function getDir(dir = "../") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, dir);
}
