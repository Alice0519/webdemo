const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
app.use(json())

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

//配置路由模块
const routesObj = require(__dirname + '/server/routes.js')
const KoaRouter = require('koa-router')
const router = new KoaRouter()

app.use(router.routes())
app.use(routesObj.routes())

//配置静态资源
const path = require('path')
const _static = require('koa-static')
const staticPath = './public'
app.use(_static(
    path.join(__dirname, staticPath)
))

app.listen(4000, () => {
    console.log('app start~')
})