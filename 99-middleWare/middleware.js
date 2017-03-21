const Koa = require('koa')
const app = new Koa()

// x-response-time

app.use(async function (ctx, next) {
  console.log('enter x-response-time')
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.set('X-Response-Time', `${ms}ms`)
  console.log('exit  x-response-time')
})

// logger

app.use(async function (ctx, next) {
  console.log('enter logger')
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
  console.log('exit  logger')
})

// response

app.use(ctx => {
  console.log('enter hello')
  ctx.body = 'Hello World'
  console.log('exit  hello')
})

app.listen(3000)
