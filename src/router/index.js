import Login from "../page/Login.vue"
import Home from "../page/Home.vue"
import UserList from "../components/User/userList.vue"
import AddUser from "../components/User/addUser.vue"

const routes = [{
        path: "/",
        redirect: "/login"
    },
    { 
        name:'login',
        path: "/login",
        component: Login
    },
    {
        name:'home',
        path: "/user",
        component: Home,
        meta:{title:'用户管理'},
        children: [{
                name:'list',
                path: 'list',
                meta:{title:'用户列表'},
                component: UserList
            },
            {
                name: 'add',
                path: 'add',
                meta:{title:'添加用户'},
                component: AddUser
            }
        ],
    }
]

export default routes