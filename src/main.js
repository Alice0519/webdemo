import { createApp } from 'vue'
import App from './App.vue'
import routes from "./router/index"
import {createRouter,createWebHashHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
import _axios from './utils/axios'
import storage from './utils/storage'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !storage.get('userInfo')) next({ name: 'login' })
    else next()
})

app.use(router)
app.use(ElementPlus)

app.config.globalProperties.$axios= _axios

app.mount('#app')
