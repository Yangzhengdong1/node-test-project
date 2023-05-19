const app = require('./app');
const { APP_PORT, PRIVATE_KEY } = require('./app/config');
// require('./app/database');

app.listen(APP_PORT, () => {
  console.log(`服务器启动成功🚀~, 端口号：${ APP_PORT }`);
});
2