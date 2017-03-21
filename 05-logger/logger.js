var Koa = require('koa')
var logger = require('koa-logger')

var app = new Koa()

app.use(logger())

app.use(async function (ctx, next) {
  ctx.type = 'text/plain'
  ctx.body = 'path=' + ctx.path + '\nquery = ' + JSON.stringify(ctx.query)
})

app.listen(3000)
