/**
* Author: zdyang
* Date: 2023-05-20 12:22:05
* LastEditors: zdyang
* LastEditTime: 2023-05-20 19:58:55
* FilePath: \coderhub\src\router\moment.router.js
* Description: 用户动态路由
*
 */
const Router = require('koa-router');
const { verifyAuth } = require('../middleware/auth.middleware');
const { create, detail, list } = require('../controller/moment.controller');

const momentRouter = new Router({prefix: '/moment'});

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/:momentId', detail);
momentRouter.get('/list', list);

module.exports = momentRouter;
