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
