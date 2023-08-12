const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// const useRoutes = require('../router');
const userRouter = require('../router/user.router');
const authRouter = require('../router/auth.router');
const momentRouter = require('../router/moment.router');
const tagRouter = require('../router/tag.router');
const fileRouter = require('../router/file.router');


const errorHandler = require('./error-handle');

const app = new Koa();
// app.useRoutes = useRoutes;

app.use(bodyParser());

// app.useRoutes();
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
app.use(momentRouter.routes());
app.use(momentRouter.allowedMethods());
app.use(tagRouter.routes());
app.use(tagRouter.allowedMethods());
app.use(fileRouter.routes());
app.use(fileRouter.allowedMethods());


app.on('error', errorHandler);

module.exports = app;
