import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import routes from './router/index.js'
import {createRouter,createWebHashHistory} from "vue-router"

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

app.use(ElementPlus)
app.use(router)

app.mount('#app')
