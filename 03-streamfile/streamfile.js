const fs = require('mz/fs')
const Koa = require('koa')
const path = require('path')

var app = new Koa()

app.use(async function (ctx, next) {
  var fpath = path.join(__dirname, ctx.path)
  console.log('fpath=%s', fpath)
  if (await fs.exists(fpath)) {
    var stat = await fs.stat(fpath)
    console.log('stat=%j', stat)
    if (await stat.isFile()) {
      ctx.type = path.extname(fpath)
      ctx.body = fs.createReadStream(fpath)
    } else if (await stat.isDirectory()) {
      ctx.body = 'fpath=' + fpath + ' is a directory'
    }
  } else {
    ctx.body = 'File not found!'
  }
})

app.listen(3000)
