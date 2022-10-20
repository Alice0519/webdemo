const xlsx = require('node-xlsx')

module.exports = exportuser

async function exportuser(ctx){
    let data = ctx.request.body
    let obj = [{
        name: "userlist",
        data:data
    }]
    let buffer = xlsx.build(obj)
    ctx.body = buffer
}