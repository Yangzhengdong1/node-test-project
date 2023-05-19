const errorType = require('../constants/error-types');
const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = '用户名或密码不能为空';
      break;
    case errorType.USER_ALREADY_EXISTS:
      status = 409; // conflict
      message = '用户名重复~';
      break;
    case errorType.USER_DOES_NOT_EXISTS:
      status = 400; // 参数错误
      message = '用户不存在~';
      break;
    case errorType.PASSWORD_IS_INCORRECT:
      status = 409; // conflict
      message = '密码错误~';
      break;
    case errorType.UNAUTHORIZED:
      status = 401; // conflict
      message = '无效的token~';
      break;
    default:
      status = 404;
      message = 'NOT FOUND';
      break;
  }
  ctx.status = status;
  ctx.body = {
    status,
    message
  };
};

module.exports = errorHandler;
