const jwt = require('jsonwebtoken');

const errorTypes = require('../constants/error-types');
const UserServe = require('../service/user.service')
const md5password = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 判断账号or密码字段为空
  if (!name || !password) {
    ctx.app.emit('error', { message:  errorTypes.NAME_OR_PASSWORD_IS_REQUIRED }, ctx);
    return;
  }
  // 判断数据库中是否有这个用户
  const result = await UserServe.getUserByName(name);
  const user = result[0]
  if (!user) {
    ctx.app.emit('error', { message: errorTypes.USER_DOES_NOT_EXISTS }, ctx);
    return;
  }
  // 判断密码是否正确
  if (md5password(password) !== user.password) {
    ctx.app.emit('error', { message: errorTypes.PASSWORD_IS_INCORRECT }, ctx);
    return;
  }
  ctx.request.body.user = user;
  await next();
};
const verifyAuth = async (ctx, next) => {
  console.log('验证授权的middleware');
  const authorization = ctx.headers.authorization;
  const token = authorization.replace('Bearer ', '');
  try {
    jwt.verify(token, PUBLIC_KEY, {
      algorithm: ['RS256']
    });
    await next();
  } catch (err) {
    ctx.app.emit('error', { message: errorTypes.UNAUTHORIZED }, ctx);
  }
};
module.exports = {
  verifyLogin,
  verifyAuth
};