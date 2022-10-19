const config = require('../mysql_config.js')

module.exports = importuser

async function importuser(data){
    let keys = data[0],keyStr = ""
    keys.forEach(el => {
        keyStr += el+','
    });
    keyStr = keyStr.substring(0,keyStr.length-1)

    let values = ""
    for(let i=1;i<data.length;i++){
      values += JSON.stringify(data[i]).replace('[','(').replace(']',')') + ','
    }
    values = values.substring(0,values.length-1)
    const connection = await config.mysql.createConnection(config.local)
    const update = 'INSERT INTO userinfo (' + keyStr + ') VALUES' + values
    await connection.execute(update) 
    await connection.end()
}
