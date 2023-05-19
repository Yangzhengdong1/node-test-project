const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// const useRoutes = require('../router');
const userRouter = require('../router/user.router');
const authRouter = require('../router/auth.router');
const errorHandler = require('./error-handle');

const app = new Koa();
// app.useRoutes = useRoutes;

app.use(bodyParser());

// app.useRoutes();
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

app.on('error', errorHandler);

module.exports = app;
