const Koa = require('koa')
const serve = require('koa-static');
const app = new Koa()

app.use(serve('public')).listen(3000)
