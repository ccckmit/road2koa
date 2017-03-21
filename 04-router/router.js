var Koa = require('koa')
var Router = require('koa-router')

var app = new Koa()
var router = new Router()

router.get('/:book/:file', async function (ctx, next) {
  console.log('ctx.params=%j', ctx.params)
  ctx.body = JSON.stringify(ctx.params, null, 2)
})

app.use(router.routes()).listen(3000)
