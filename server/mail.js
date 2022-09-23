const nodemailer = require("nodemailer")

//发送邮箱配置
const config = {
    host: "smtp.163.com",
    port: 465,
    secure: true,
    auth: {
        user: "18331550519@163.com",
        pass: "GRTMFVXEBGJQVLPV"
    }
}

//创建一个smtp客户端对象
const transporter = nodemailer.createTransport(config)

const sendMail = (mail) => {
    transporter.sendMail(mail, (err, info) => {
        if (err) console.log('mail error:', err)
        transporter.close()
    })
}

module.exports = {
    sendMail
}