/**
* Author: zdyang
* Date: 2023-05-08 20:21:40
* LastEditors: zdyang
* LastEditTime: 2023-05-13 11:54:56
* FilePath: \coderhub\src\middleware\user.middleware.js
* Description: 用户接口相关中间件，主要是对参数进行拦截校验以及加密
*
 */


const errorType = require('../constants/error-types');
const md5password = require('../utils/password-handle');
const service = require('../service/user.service');
const verifyUser = async (ctx, next) => {
  // 1、获取用户名和密码
  const { name, password } = ctx.request.body;
  // 2、判断是否为空
  if (!name || !password) {
    // const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    ctx.app.emit('error', {message: errorType.NAME_OR_PASSWORD_IS_REQUIRED}, ctx);
    return;
  }
  // 3、判断用户名是否重复
  const result = await service.getUserByName(name);
  if (result.length > 0) {
    ctx.app.emit('error', {message: errorType.USER_ALREADY_EXISTS}, ctx);
    return;
  }
  await next();
};

const passwordHandle = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = {
  verifyUser,
  passwordHandle
};
