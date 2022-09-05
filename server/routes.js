//配置公共路由模块
const routes = require('koa-router')()
const fs = require('fs')
const apis = fs.readdirSync(__dirname + '/api')

const urls = {
    'register':{method:'post'}
}

apis.forEach(file=>{
   let fileName = file.replace('.js','')
   let method = urls[fileName] && urls[fileName].method ? urls[fileName].method : 'post'
   let url = '/' + fileName
   let fun = require(__dirname + '/api/' + file)
   routes[method](url,fun)
})

module.exports = routes






