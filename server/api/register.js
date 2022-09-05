//独立模块，连接数据库，进行增删改查
const config = require('../mysql_config.js')

module.exports = register

async function register(ctx){
    let msg = null,success = true
    let data = ctx.request.body
  
    const connection = await config.mysql.createConnection(config.local)
    const statement = 'SELECT * FROM userinfo WHERE `name` =?'
    const [rows] = await connection.execute(statement,[data.name])
    if(rows.length>0){
        success = false
        msg = '注册失败：该账户名称已存在'
    }else{
        const insert = 'INSERT INTO userinfo (name,email,password) VALUES (?,?,?)'
        const result = await connection.execute(insert,[data.name,data.email,data.password])
        if(result[0].affectedRows === 1){
            msg = '注册成功：请重新登录'
        }else{
            success = false
            msg = '数据库错误'
        }        
    }
    await connection.end()
    ctx.body = {
        success: success,
        data:{},
        message:msg
    }
}