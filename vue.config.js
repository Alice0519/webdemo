module.exports = {
    lintOnSave: false,
    devServer:{
        hot:true,
        proxy:{
            '/':{
                target:"http://localhost:4000",
                secure:false, //http访问
                changeOrigin:true//跨域
            }
        }
    }
}