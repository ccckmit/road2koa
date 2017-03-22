const Koa = require('koa')
const serve = require('koa-static')
const Router = require('koa-router')
const fs = require('mz/fs')
const asyncBusboy = require('async-busboy')

const app = new Koa()
const router = new Router()

router.post('/upload', async function (ctx, next) {
  const {files, fields} = await asyncBusboy(ctx.req)
  console.log('files=%s', JSON.stringify(files, null, 2))
  console.log('fields=%j', fields)
  for (var i in files) {
    var file = files[i].filename
    console.log('file=%s', file)
    var stream = fs.createWriteStream('upload/' + file)
    files[i].pipe(stream)
  }
  ctx.body = JSON.stringify(files, null, 2)
})

app.use(serve('public')).use(router.routes()).listen(3000)
