/**
 * vendor 依赖更新 / 校验
 *
 *   node node_util/vendor.mjs            按清单重新下载全部依赖到 vendor/，并回写 sha256
 *   node node_util/vendor.mjs marked     只更新名字/文件名匹配的依赖（可多个关键字）
 *   node node_util/vendor.mjs --check    只校验文件存在且 sha256 与清单一致（不联网）
 *
 * 升级流程：
 *   1. 改 node_util/vendor.manifest.json 里对应条目的 version（URL 由 {version} 模板生成）
 *   2. node node_util/vendor.mjs
 *   3. node node_util/verify.mjs（确认 API 没变导致回归）
 *
 * 清单是版本的唯一来源；README 的表格只是说明，不必逐处同步。
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = join(ROOT, "node_util", "vendor.manifest.json");
const VENDOR = join(ROOT, "vendor");

const args = process.argv.slice(2);
const check = args.includes("--check");
const filters = args.filter((a) => !a.startsWith("--"));

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");
const urlOf = (entry) => entry.url.replaceAll("{version}", entry.version);

let failed = 0;
let changed = false;

for (const entry of manifest) {
  if (
    filters.length &&
    !filters.some((f) => entry.file.includes(f) || entry.name.includes(f))
  ) {
    continue;
  }

  const dest = join(VENDOR, entry.file);

  if (check) {
    if (!existsSync(dest)) {
      console.error(`✗ ${entry.file} 缺失（运行 node node_util/vendor.mjs）`);
      failed++;
      continue;
    }
    const hash = sha256(readFileSync(dest));
    if (entry.sha256 && hash !== entry.sha256) {
      console.error(`✗ ${entry.file} 内容与清单 sha256 不一致`);
      failed++;
      continue;
    }
    console.log(`✓ ${entry.name}@${entry.version} → vendor/${entry.file}`);
    continue;
  }

  const url = urlOf(entry);
  process.stdout.write(`↓ ${entry.name}@${entry.version} → vendor/${entry.file} ... `);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    const hash = sha256(buf);
    if (entry.sha256 && entry.sha256 !== hash) changed = true;
    entry.sha256 = hash;
    console.log(`ok ${(buf.length / 1024).toFixed(1)}KB`);
  } catch (e) {
    console.log(`失败：${e.message}`);
    failed++;
  }
}

if (!check) {
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
}

if (failed) {
  console.error(`\n${failed} 项失败`);
  process.exit(1);
}

if (check) {
  console.log("\nvendor 校验通过");
} else {
  console.log(
    changed
      ? "\nvendor 已更新（有文件内容变化，记得跑 node node_util/verify.mjs）"
      : "\nvendor 已是最新（内容无变化）"
  );
}
