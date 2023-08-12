const service = require('../service/tag.service');

class TagController {
  async create(ctx) {
    const { name } = ctx.request.body;
    const result = await service.create(name);
    ctx.body = result;
  }
}

module.exports = new TagController();