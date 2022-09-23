const config = require('../mysql_config.js')

module.exports = findpass

async function findpass(ctx) {
    let msg = null,
        success = true
    let data = ctx.request.body

    const connection = await config.mysql.createConnection(config.local)
    const statement = 'SELECT * FROM userinfo WHERE `email` =?'
    const [rows] = await connection.execute(statement, [data.email])

    if (rows.length == 0) {
        success = false
        msg = '该邮箱未绑定用户，请重新输入'
    } else {
        let name = rows[0].name
        const update = 'UPDATE userinfo SET `password` = ? WHERE `name` = ?'
        const result = await connection.execute(update, [data.password, name])
        if (result[0].affectedRows === 1) {
            msg = '已找回密码：请重新登录'
        } else {
            success = false
            msg = '数据库错误'
        }
    }
    await connection.end()
    ctx.body = {
        success: success,
        data: {},
        message: msg
    }
}