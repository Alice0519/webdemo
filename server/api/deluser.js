const config = require('../mysql_config.js')

module.exports = deluser

async function deluser(ctx){
    let msg = null,success = true
    let data = ctx.request.body
    const connection = await config.mysql.createConnection(config.local)
    const statement = 'DELETE FROM userinfo WHERE `id` = ?'
    const [rows] = await connection.execute(statement,[data.id])
    
    if(rows.length == 0){
        success = false
        msg = '系统错误'
    }
    await connection.end()
    ctx.body = {
        success: success,
        data:{},
        message:msg
    }
}