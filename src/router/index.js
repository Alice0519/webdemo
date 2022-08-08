import Home from '../page/Home.vue'
import Login from '../page/Login.vue'

const routes = [{
        path: '/',
        redirect: "/login"
    },
    {
        path: '/login',
        name: "login",
        component: Login
    },
    {
        path: '/home',
        name: "home",
        component: Home
    }
]

export default routes