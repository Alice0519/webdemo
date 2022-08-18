import axios from "axios"

const _axios = axios.create({
    timeout:3000
})

//添加请求拦截器
_axios.interceptors.request.use(config=>{
   return config
},error=>{
   return Promise.reject(error)
})

//添加响应拦截器
_axios.interceptors.response.use(response=>{
    return response
},error=>{
    return Promise.reject(error)
})

export default _axios
