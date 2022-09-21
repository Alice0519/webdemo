const config = require('../mysql_config.js')
const mail = require('../mail.js')

module.exports = sendmail

async function sendmail(ctx){
    let msg = null,success = true
    let data = ctx.request.body
    console.log(111,data)
  
    const connection = await config.mysql.createConnection(config.local)
    const statement = 'SELECT * FROM userinfo WHERE `email` =?'
    const [rows] = await connection.execute(statement,[data.email])
    console.log(22,rows)
    if(rows.length == 0){
        success = false
        msg = '该邮箱未绑定用户，请重新输入'
    }else{
        //发送邮件
        let verifyCode = getRandom(6)

        
   
        let mailInfo = {
            from:" 18331550519@163.com",
            to:data.email,
            subject:"获取验证码",
            text:"验证码：" + verifyCode
        }
        mail.sendMail(mailInfo)
        
        //存储验证码
        const update = 'UPDATE userinfo SET verifyCode = ? where email = ?'
        await connection.execute(update,[data.verifyCode,data.email])    
    }
    await connection.end()
    ctx.body = {
        success: success,
        data:{},
        message:msg
    }
}

function getRandom(size){
   let number = null
   for(let i=0;i<size;i++){
      number += Math.floor(Math.random()*10+1) //1-10随机数
   }
   return number
}