const errorTypes = require('../constants/error-types');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle');
const verifyHandle = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 判断用户名/密码是否为空
  if ( !name || !password ) {
    ctx.app.emit('error', { message: errorTypes.NAME_OR_PASSWORD_IS_REQUIRED }, ctx);
    return;
  }

  // 判断用户名是否重复
  const result = await service.getUserName(name);
  if (!!result.length) {
    ctx.app.emit('error', { message: errorTypes.USER_ALREADY_EXISTS }, ctx);
    return;
  }

  // 密码加密
  ctx.request.body.password =  md5password(password);
  await next();
};

module.exports = verifyHandle;