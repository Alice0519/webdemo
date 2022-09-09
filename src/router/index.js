import Login from "../page/Login.vue"
import Home from "../page/Home.vue"
import UserList from "../components/User/userList.vue"
import AddUser from "../components/User/addUser.vue"

const routes = [{
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/user",
        component: Home,
        meta:{title:'用户管理'},
        children: [{
                path: 'list',
                meta:{title:'用户列表'},
                component: UserList
            },
            {
                path: 'add',
                meta:{title:'添加用户'},
                component: AddUser
            }
        ],
    }
]

export default routes