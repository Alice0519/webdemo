const config = require('../mysql_config.js')

module.exports = searchuser

async function searchuser(ctx){
    let msg = null,success = true
    let data = ctx.request.body
    const connection = await config.mysql.createConnection(config.local)
    const statement = "SELECT * FROM userinfo WHERE `name` LIKE '%" + data.val + "%'"
    const [rows] = await connection.execute(statement)
    if(rows.length == 0){
        msg = '暂无用户'
    }
    await connection.end()
    ctx.body = {
        success: success,
        data:{
            data:rows
        },
        message:msg
    }
}