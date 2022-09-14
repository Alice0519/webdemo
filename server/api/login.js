const config = require('../mysql_config.js')

module.exports = login

async function login(ctx){
    let msg = null,success = true
    let data = ctx.request.body
  
    const connection = await config.mysql.createConnection(config.local)
    const statement = 'SELECT * FROM userinfo WHERE `name` =?'
    const [rows] = await connection.execute(statement,[data.name])
    if(rows.length == 0){
        success = false
        msg = '登录失败：该账户名称不存在，请重新输入'
    }else{
        const select = 'SELECT * FROM userinfo WHERE `name` =? && `password` = ?'
        const [rows] = await connection.execute(select,[data.name,data.password])
        if(rows.length === 1){
            msg = '登录成功'
        }else{
            success = false
            msg = '登录失败：密码有误，请重新输入'
        }        
    }
    await connection.end()
    ctx.body = {
        success: success,
        data:{
            userInfo:rows[0]
        },
        message:msg
    }
}