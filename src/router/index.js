import Login from "../page/Login.vue"

const routes = [
    {
        path:"/",
        redirect: "/login"
    },
    {
        path:"/login",
        component:Login
    }
]

export default routes