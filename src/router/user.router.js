const Router = require('koa-router');
const controller = require('../controller/user.controller');
const { verifyUser, passwordHandle } = require('../middleware/user.middleware');

const userRouter = new Router({prefix: '/users'});
userRouter.post('/register', verifyUser, passwordHandle, controller.register);

module.exports = userRouter;
