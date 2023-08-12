/**
* Author: zdyang
* Date: 2023-05-08 19:09:47
* LastEditors: zdyang
* LastEditTime: 2023-05-13 11:18:45
* FilePath: \coderhub\src\controller\user.controller.js
* Description: 用户接口相关控制器处理逻辑，主要是处理数据返回相关逻辑
*
 */

const fs = require('fs');

const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const { AVATAR_PATH } = require('../constants/file-path');

class UserController {
  async register(ctx) {
    // 获取用户传递的参数
    const params = ctx.request.body;
    // 连接数据库查询数据
    const result = await userService.register(params);
    // 返回数据
    ctx.body = result;
  }

  async avatarInfo(ctx) {
    const { userId } = ctx.params;

    const avatarInfo = await fileService.getAvatarByUserId(userId);
    ctx.response.set('content-type', avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
