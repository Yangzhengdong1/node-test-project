const mysql = require('mysql2');
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = require('../app/config');

// 创建连接池
const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
});

// 测试数据库是否连接成功
connections.getConnection((error, conn) => {
  conn.connect(err => {
    if (err) {
      console.log('连接数据库失败：', err);
    } else {
      console.log('连接数据库成功~');
    }
  });
});


module.exports = connections.promise();
