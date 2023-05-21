/**
* Author: zdyang
* Date: 2023-05-13 11:09:23
* LastEditors: zdyang
* LastEditTime: 2023-05-20 20:01:48
* FilePath: \coderhub\src\router\auth.router.js
* Description: 权限相关路由
*
 */
const Router = require('koa-router');

const {
  login,
  success
} = require('../controller/auth.controller');
const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware');

const authRouter = new Router();

authRouter.post('/login', verifyLogin, login);
authRouter.get('/authorization', verifyAuth, success);

module.exports = authRouter;
