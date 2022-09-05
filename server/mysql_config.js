//连接mysql数据库
const mysql = require('mysql2/promise')

const local = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'BBlove1234',
    database: 'webdemo'
}

module.exports = {
    mysql,
    local
}