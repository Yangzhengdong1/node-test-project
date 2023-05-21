/**
* Author: zdyang
* Date: 2023-05-19 18:59:32
* LastEditors: zdyang
* LastEditTime: 2023-05-20 20:04:30
* FilePath: \coderhub\src\middleware\auth.middleware.js
* Description: 处理用户权限相关
*
 */
const jwt = require('jsonwebtoken');

const errorTypes = require('../constants/error-types');
const UserServe = require('../service/user.service');
const md5password = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 判断账号or密码字段为空
  if (!name || !password) {
    ctx.app.emit('error', { message: errorTypes.NAME_OR_PASSWORD_IS_REQUIRED }, ctx);
    return;
  }
  // 判断数据库中是否有这个用户
  const result = await UserServe.getUserByName(name);
  const user = result[0];
  if (!user) {
    ctx.app.emit('error', { message: errorTypes.USER_DOES_NOT_EXISTS }, ctx);
    return;
  }
  // 判断密码是否正确
  if (md5password(password) !== user.password) {
    ctx.app.emit('error', { message: errorTypes.PASSWORD_IS_INCORRECT }, ctx);
    return;
  }
  // 将数据库中的用户信息存储下来
  ctx.request.body.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  console.log('验证授权的middleware');
  const authorization = ctx.headers.authorization;
  // 判断当前接口是否携带有 authorization 字段
  if (!authorization) {
    ctx.app.emit('error', { message: errorTypes.UNAUTHORIZED }, ctx);
    return;
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithm: ['RS256']
    });
    ctx.user = result;
    await next();
  } catch (err) {
    ctx.app.emit('error', { message: errorTypes.UNAUTHORIZED }, ctx);
  }
};
module.exports = {
  verifyLogin,
  verifyAuth
};
