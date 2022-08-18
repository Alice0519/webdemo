import { createApp } from 'vue'
import App from './App.vue'
import routes from "./router/index"
import {createRouter,createWebHashHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
import _axios from './axios.js'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.config.globalProperties.$axios= _axios

app.mount('#app')
