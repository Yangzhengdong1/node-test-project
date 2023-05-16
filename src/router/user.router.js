const Router = require('koa-router');
const { register } = require('../controller/user.controller');
const verifyHandle = require('../middleware/user.middleware');
const userRouter = new Router({ prefix: '/users' });
userRouter.post('/register', verifyHandle, register);

module.exports = userRouter;

