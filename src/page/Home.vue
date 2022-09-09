<template>
    <div class="home">
        <el-row class="header" justify="space-around" align="middle">
            <el-col :span="2">
                <el-image style="width: 50px;" :src="logoUrl" />
            </el-col>
            <el-col :span="2" :offset="20">
                <div class="grid-content bg-purple-light">
                    <el-dropdown>
                        <el-image style="width: 50px;border-radius: 100%;cursor: pointer;" :src="avatarUrl" />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>黄金糕</el-dropdown-item>
                                <el-dropdown-item>狮子头</el-dropdown-item>
                                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>

                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-col :span="12">
                    <el-menu router active-text-color="#ffd04b" background-color="#545c64" :default-active="$route.path"
                        text-color="#fff">
                        <template v-for="menu in menus">
                            <el-sub-menu v-if="menu.children">
                                <template #title>
                                    <span>{{menu.meta.title}}</span>
                                </template>
                                <el-menu-item :route="menu.path + '/' + sub_menu.path" :index = "menu.path + '/' + sub_menu.path"  v-for="sub_menu in menu.children">{{sub_menu.meta.title}}</el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :route="menu.path" :index ="menu.path" >{{menu.meta.title}}</el-menu-item>
                        </template>
                    </el-menu>
                </el-col>
            </el-col>
            <el-col :span="16">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logoUrl: "/logo.webp",
                avatarUrl: "/user.svg"
            }
        },
        computed: {
            menus() {
                let routes = this.$router.options.routes
                let result = []
                let except = ['/', '/login']
                result = routes.filter(route => !except.includes(route.path))
                return result
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            }
        },
        created() {
           
        }
    }
</script>

<style>
    .home .header {
        height: 80px;
        background-color: #545c64;
    }
</style>