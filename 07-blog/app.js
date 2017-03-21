var Koa = require('koa')
var Router = require('koa-router')
var render = require('./lib/render')
var logger = require('koa-logger')
var bodyParser = require('koa-bodyparser')

var app = new Koa()
var router = new Router()

app.use(bodyParser())

var posts = []

app.use(logger())

router
  .get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create)

async function list (ctx) {
  ctx.body = await render('list', { posts: posts })
}

async function add (ctx) {
  ctx.body = await render('new')
}

async function show (ctx) {
  var post = posts[ctx.params.id]
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await render('show', { post: post })
}

async function create (ctx) {
  var post = ctx.request.body
  var id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
  ctx.redirect('/')
}

app.use(router.routes()).listen(3000)
