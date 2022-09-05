import Login from "../page/Login.vue"
import Home from "../page/Home.vue"

const routes = [
    {
        path:"/",
        redirect: "/login"
    },
    {
        path:"/login",
        component:Login
    },
    {
        path:"/home",
        component:Home
    }
]

export default routes