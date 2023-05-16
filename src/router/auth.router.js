const Router = require('koa-router');

const {
  login
} = require('../controller/auth.controller');
const authVerify = require('../middleware/auth.middleware');

const authRouter = new Router();

authRouter.post('/login', authVerify, login);

module.exports = authRouter;
