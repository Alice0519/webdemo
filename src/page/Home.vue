<template>
    <div class="home">
        <el-row class="header" justify="space-around" align="middle">
            <el-col :span="2">
                <el-image style="width: 50px;" :src="logoUrl" />
            </el-col>
            <el-col :span="2" :offset="20">
                <div>
                    <el-dropdown>
                        <el-image style="width: 50px;border-radius: 100%;cursor: pointer;" :src="avatarUrl" />
                        <template #dropdown>
                            <el-descriptions :column="1" style="padding:20px;">
                                <el-descriptions-item label="账号:">{{userInfo.name}}</el-descriptions-item>
                                <el-descriptions-item label="邮箱:">{{userInfo.email}}</el-descriptions-item>
                                <el-descriptions-item style="margin-top:20px;">
                                    <el-upload style="display:inline-flex;margin-right:10px;" headers="{enctype:'multipart/form-data'}" name="avatar" show-file-list="false" :data = "{name:userInfo.name}" action="/upload" :on-success="handleAvatarSuccess">
                                        <el-button>上传头像</el-button>
                                    </el-upload>
                                    <el-button @click="logout" type="primary">退出登录</el-button>
                                </el-descriptions-item>
                            </el-descriptions>
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
                                <el-menu-item :route="menu.path + '/' + sub_menu.path"
                                    :index="menu.path + '/' + sub_menu.path" v-for="sub_menu in menu.children">
                                    {{sub_menu.meta.title}}</el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :route="menu.path" :index="menu.path">{{menu.meta.title}}
                            </el-menu-item>
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
    import storage from '../utils/storage'
    export default {
        data() {
            return {
                userInfo:JSON.parse(storage.get('userInfo')),
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
            handleAvatarSuccess(response,uploadFile){
              this.avatarUrl = response.data.path
              this.userInfo.avatar = this.avatarUrl
              storage.set('userInfo',this.userInfo)
            },
            logout() {
                storage.remove('userInfo')
                this.$router.push('/login')
            }
        },
        created() {
            this.avatarUrl = this.userInfo.avatar || "/user.svg"
        }
    }
</script>

<style>
    .home .header {
        height: 80px;
        background-color: #545c64;
    }
</style>