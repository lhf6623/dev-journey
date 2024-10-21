// 便于管理 localStorage key 的版本
import pkg from "../../package.json" with { type: "json" };
const version = pkg.version;
const loc = window.localStorage || localStorage
const {parse, stringify} = JSON

class Cache {
  constructor(key) {
    this.key = key;
  }
  #get(){
    const data = loc.getItem(this.key) ?? '{}'
    return parse(data)
  }
  #set(data){
    loc.setItem(this.key, stringify(data))
  }
  getItem(key) {
    const data = this.#get()
    return data[key];
  }
  setItem(key, value) {
    const data = this.#get()
    this.#set({...data, [key]: value})
  }
  remove() {
    return loc.removeItem(this.key);
  }
}
export default new Cache(`lhf6623_${version}`);
