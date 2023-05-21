/**
* Author: zdyang
* Date: 2023-05-13 11:22:55
* LastEditors: zdyang
* LastEditTime: 2023-05-20 20:00:49
* FilePath: \coderhub\src\controller\auth.controller.js
* Description: 用户权限相关接口控制器，主要是 token 的颁发与校验
*
 */
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');

class AuthController {
  async login(ctx, next) {
    // 颁发 token
    const { id, name } = ctx.request.body.user;
    try {
      const token = jwt.sign({id, name}, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24,
        algorithm: 'RS256'
      });
      ctx.body = {
        status: 200,
        data: {
          id,
          name,
          token
        },
        message: '用户登录成功'
      };
    } catch (err) {
      console.log(err, 'token授权出错');
    }
  }

  async success(ctx, next) {
    ctx.body = 'token 未过期';
  }
}

module.exports = new AuthController();
