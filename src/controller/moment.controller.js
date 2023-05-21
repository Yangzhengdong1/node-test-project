/**
* Author: zdyang
* Date: 2023-05-20 17:09:24
* LastEditors: zdyang
* LastEditTime: 2023-05-20 20:00:01
* FilePath: \coderhub\src\controller\moment.controller.js
* Description: 用户动态接口相关控制器
*
 */
const MomentService = require('../service/moment.service');

class MomentController {
  async create(ctx, next) {
    const params = {
      userId: ctx.user.id,
      content: ctx.request.body.content
    };
    const result = await MomentService.create(params);
    if (result) {
      ctx.body = {
        status: 200,
        message: '动态发表成功'
      }
    }
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params;
    const result = await MomentService.getMomentById(momentId);
    ctx.body = result[0];
  }

  async list(ctx, next) {
    const { pageNum, pageSize } = ctx.query;
  }
}

module.exports = new MomentController();
