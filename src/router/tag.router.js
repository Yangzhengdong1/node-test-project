const Router = require('koa-router');
const {
  verifyAuth
} = require('../middleware/auth.middleware');

const {
  create
} = require('../controller/tag.controller');

const tagRouter = new Router({prefix: '/tag'});


tagRouter.post('/create', verifyAuth, create);

module.exports = tagRouter;