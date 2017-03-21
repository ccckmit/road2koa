const Koa = require('koa')
var app = new Koa()

app.use(async function (ctx, next) {
  console.log('path=%s', ctx.path)
  console.log('query=%j', ctx.query)
  console.log('query.name=%s', ctx.query.name)
  ctx.type = 'text/plain'
  ctx.body = 'path=' + ctx.path + '\nquery = ' + JSON.stringify(ctx.query)
})

app.listen(3000)
