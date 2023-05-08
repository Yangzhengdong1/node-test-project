const dotenv = require('dotenv');

dotenv.config(); // 调用这个方法后 dotenv会将我们根目录下的 .env 文件中的变量添加至 process.env(环境变量)中

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env;
