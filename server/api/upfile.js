const config = require('../mysql_config.js')

module.exports = upfile

async function upfile(data){
    const connection = await config.mysql.createConnection(config.local)
    const update = 'UPDATE userinfo SET `avatar` = ? WHERE `name` = ?'
    await connection.execute(update,[data.avatar,data.name]) 
    await connection.end()
    return
}
