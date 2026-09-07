import { version, name } from "./util.js";

const loc = window.localStorage || localStorage;
const { parse, stringify } = JSON;

class Cache {
  constructor(key) {
    this.key = key;
  }
  #get() {
    const data = loc.getItem(this.key) ?? "{}";
    return parse(data);
  }
  #set(data) {
    loc.setItem(this.key, stringify(data));
  }
  getItem(key) {
    const data = this.#get();
    return data[key];
  }
  setItem(key, value) {
    const data = this.#get();
    this.#set({ ...data, [key]: value });
  }
  remove() {
    return loc.removeItem(this.key);
  }
}
const cache = new Cache(`${name}_${version}`);

// 版本升级数据迁移：旧版本 key 的数据一次性搬入新 key（用户保存的代码/文档/主题不丢），只读旧写新，不删除旧数据
for (const legacyVersion of ["0.2.9", "0.2.8"]) {
  const legacyKey = `${name}_${legacyVersion}`;
  if (legacyKey !== cache.key && !loc.getItem(cache.key) && loc.getItem(legacyKey)) {
    loc.setItem(cache.key, loc.getItem(legacyKey));
    break;
  }
}

export default cache;
