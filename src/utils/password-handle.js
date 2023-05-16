const crypto = require('crypto'); // node 自带加密库

const md5password = (password) => crypto.createHash('md5').update(password).digest('hex');
  // const result = md5.update(password).digest('hex'); // 返回16进制的数据


module.exports = md5password;

