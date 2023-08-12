const fileService = require('../service/file.service');
const userService = require('../service/user.service');

const { APP_HOST, APP_PORT } = require('../app/config');

class FileController {
  async saveAvatarInfo(ctx) {
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;

    const result = await fileService.createAvatar(filename, mimetype, size, id);

    // 将头像地址保存到 user 表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarByUserId(avatarUrl, id);
    ctx.body = '上传头像成功~~';
  }
}

module.exports = new FileController();