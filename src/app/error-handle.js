const errorTypes = require('../constants/error-types');
const errorHandle = async (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = '用户名或密码不能为空'
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 405;
      message = '用户名重复';
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400;
      message = '用户不存在';
      break;
    default:
      status = 404;
      message = 'NOT FOUND';
  }
  ctx.status = status;
  ctx.body = {
    status,
    message
  }
}

module.exports = errorHandle;