/**
 * Author: zdyang
 * Date: 2023-05-08 19:09:47
 * LastEditors: zdyang
 * LastEditTime: 2023-05-08 19:26:06
 * FilePath: \NodeJS\coderhub\src\controller\user.controller.js
 * Description: 用户接口相关中间件控制器处理逻辑
 *
 */


const { register } = require('../service/user.service');

class UserController {
  async register(ctx) {
    // 获取用户传递的参数
    const params = ctx.request.body;
    // 连接数据库查询数据
    const result = await register(params);
    // 返回数据
    ctx.body = result;
  }
}

module.exports = new UserController();
