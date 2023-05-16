const errorTypes = require('../constants/error-types');
const userService = require('../service/user.service');
const md5password = require("../utils/password-handle");

const authVerify = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 校验不为空
  if (!name || !password) {
    ctx.app.emit('error', { message: errorTypes.NAME_OR_PASSWORD_IS_REQUIRED }, ctx);
    return;
  }
  // 判断数据库中是否有这个用户
  const result = await userService.getUserName(name);
  if (!result.length) {
    ctx.app.emit('error', {message: errorTypes.USER_DOES_NOT_EXISTS}, ctx);
    return;
  }
  // 密码加密
  ctx.request.body.password =  md5password(password);
  await next();
}

module.exports = authVerify;