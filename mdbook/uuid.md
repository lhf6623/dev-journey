- 1、使用自增计数器，对于生成测试数据可用，浏览器中慎用，刷新会重置，多标签页会冲突。

  ```javascript
  let num = 0;
  function generateId() {
    return num++;
  }
  ```

- 2、使用 `Date.now()` ＋ 随机数 `Math.random()` 对于一些常见场景可以胜任，高并发状态下不推荐。

  ```javascript
  function uuid() {
    const now = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    return `${now}-${random}`; // uuid: md3nu1xi-ifcr700ugqi
  }
  ```

- 3、使用 npm 安装依赖包：uuid。最好的方法，需要多余的依赖。

  ```shell
  npm install uuid
  ```

  ```javascript
  import { v4 as uuidv4 } from "uuid";

  uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  ```

- 4、使用 `crypto.randomUUID()`，跟 npm uuid 差不多，但是只能在 https 中使用。

  ```javascript
  const uniqueId = crypto.randomUUID();

  // 示例输出: "07fdb47a-1d05-4a07-878c-a9979ac3ec6a"
  ```
