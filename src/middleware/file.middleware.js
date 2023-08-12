const multer = require('koa-multer');

const avatarUpload = multer({ dest: './uploads/avatar' });

const avatarHandle = avatarUpload.single('avatar');

module.exports = {
  avatarHandle
}