const config = require('../mysql_config.js')

module.exports = userlist

async function userlist(ctx){
    let msg = null,success = true
    const connection = await config.mysql.createConnection(config.local)
    const statement = 'SELECT * FROM userinfo'
    const [rows] = await connection.execute(statement)
    if(rows.length == 0){
        success = false
        msg = '获取失败：请先添加用户'
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