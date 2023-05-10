const crypto = require('crypto'); // node 自带加密库

const md5password = (password) => {
  const md5 = crypto.createHash('md5');
  const result = md5.update(password).digest('hex'); // 返回16进制的数据
  return result;
};

module.exports = md5password;

