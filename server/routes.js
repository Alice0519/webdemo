//配置公共路由模块
const routes = require('koa-router')()
const fs = require('fs')
const apis = fs.readdirSync(__dirname + '/api')

let upfile = null,importuser = null

const urls = {
    'register': {
        method: 'post'
    }
}

apis.forEach(file => {
    let fileName = file.replace('.js', '')
    let method = urls[fileName] && urls[fileName].method ? urls[fileName].method : 'post'
    let url = '/' + fileName
    let fun = require(__dirname + '/api/' + file)
    if (fileName == 'upfile'){
        upfile = fun
        return 
    }
    if (fileName == 'importuser'){
        importuser = fun
        return 
    }
    routes[method](url, fun)
})

//上传文件配置
const multer = require('koa-multer')
const xlsx = require('node-xlsx')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({storage:storage})

routes.post('/upload',upload.single('avatar'), async ctx=>{
    const {path} = ctx.req.file
    const {name} = ctx.req.body

    //更新数据库 && 返回file url
    await upfile({avatar:path.slice(7),name:name})
    ctx.body = {
        success: true,
        data:{
            path:path.slice(7)
        },
        message:""
    }
})

routes.post('/import',upload.single('file'), async ctx=>{
    const filename = ctx.req.file.filename,filePath = 'public/' + filename
    let data = xlsx.parse(filePath)[0].data

    //批量更新数据库
    await importuser(data)
    fs.unlinkSync(filePath)
    ctx.body = {
        success: true,
        data:{},
        message:""
    }
})

module.exports = routes