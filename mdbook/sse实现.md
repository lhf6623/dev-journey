# sse 实现

### 后端代码

```js
const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const { PassThrough } = require("stream");

const app = new Koa();
const router = new Router();

// SSE 端点
router.get("/sse", async (ctx) => {
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  ctx.status = 200; // 确保状态码是 200

  const stream = new PassThrough();
  ctx.body = stream;
  setInterval(() => {
    stream.write(`data: ${new Date()}\n\n`);
  }, 1000);

  // 当客户端断开连接时清理资源
  ctx.req.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

app.use(cors());
// 注册路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

### 前端代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSE Demo</title>
  </head>
  <body>
    <h1>Server-Sent Events (SSE) Demo</h1>
    <div id="messages"></div>

    <script>
      const eventSource = new EventSource("http://localhost:3300/sse1");

      eventSource.onmessage = function (event) {
        console.log("Received data:", event.data);
        // const messagesDiv = document.getElementById("messages");
        // const data = JSON.parse(event.data); // 解析服务端发来的 JSON 数据
        // const message = document.createElement("p");
        // message.textContent = `Message: ${data.message}, Count: ${data.count}`;
        // messagesDiv.appendChild(message);
      };

      eventSource.onerror = function (event) {
        console.error("SSE error occurred:", event);
      };
    </script>
  </body>
</html>
```
