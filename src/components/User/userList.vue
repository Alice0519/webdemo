<template>
    <el-row>
        <el-input v-model="inputVal" style="width:240px;margin-right:10px;" placeholder="输入账户" />
        <el-button type="primary" @click="search">查找</el-button>
        <el-button type="primary" @click="add" link>添加</el-button>
        <el-upload style="display:inline-flex;margin:0 10px;" accept=".xlsx" headers="{enctype:'multipart/form-data'}" name="file" show-file-list="false" action="/import" :on-success="handleFileSuccess">
            <el-button>导入</el-button>
        </el-upload>
        <el-button type="primary" @click="add">导出</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%;margin-top:20px;">
        <el-table-column type="selection" width="100" />
        <el-table-column prop="name" label="账户" width="200" />
        <el-table-column prop="email" label="邮箱" width="340" />
        <el-table-column prop="createTime" label="创建时间" width="200" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                <el-button link type="primary" size="small" @click="delDialog(scope.row.id,scope.row.name)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="用户信息" width="30%">
        <el-form ref="loginForm" :model="loginForm" status-icon label-width="80px" :rules="rules">
            <el-form-item label="账户" prop="name">
                <el-input v-model="loginForm.name" :placeholder="loginFormPlaceholder.namePlaceholder" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="loginForm.email" type="email" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="update">确认</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogDelVisible" title="确认框" width="30%">
        <span>是否要删除该{{delName}}用户?</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDelVisible = false">取消</el-button>
                <el-button type="primary" @click="deleteUser">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
    const validateName = (rule, value, callback) => {
        if (!/^[\u4e00-\u9fa5a-zA-Z]{3,10}$/.test(value)) {
            callback(new Error(this.loginFormPlaceholder.namePlaceholder))
        }
        callback()
    }

    export default {
        data() {
            return {
                inputVal: "",
                dialogDelVisible: false,
                loginFormPlaceholder: {
                    namePlaceholder: "3-10个英文或中文字符",
                },
                rules: {
                    name: [{
                            required: true,
                            message: require,
                            trigger: 'blur'
                        },
                        {
                            validator: validateName,
                            trigger: 'change'
                        },
                    ],
                    email: [{
                            required: true,
                            message: require,
                            trigger: 'blur'
                        },
                        {
                            type: 'email',
                            message: '请输入正确邮箱地址',
                            trigger: ['blur', 'change']
                        },
                    ]
                },
                loginForm: {
                    name: "",
                    email: "",
                },
                dialogVisible: false,
                tableData: [],
                delId: "",
                delName:""
            }
        },
        methods: {
            handleFileSuccess(response){
                if(response.success){
                    this.getData()
                }               
            },
            delDialog(id,name) {
                this.dialogDelVisible = true
                this.delId = id
                this.delName = name
            },
            deleteUser() {
                console.log(1111,this.delId)
                this.$axios.post('/deluser', {
                    id: this.delId,
                }).then((data) => {
                    if (data.success) {
                        this.getData()
                        this.dialogDelVisible = false
                    } else {
                        this.$message({
                            message: data.message,
                            type: data.success ? 'success' : 'error'
                        })
                    }
                })
            },
            update() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.$axios.post('/updateuser', {
                            id: this.loginForm.id,
                            name: this.loginForm.name,
                            email: this.loginForm.email
                        }).then((data) => {
                            if (data.success) {
                                this.getData()
                                this.dialogVisible = false
                            } else {
                                this.$message({
                                    message: data.message,
                                    type: data.success ? 'success' : 'error'
                                })
                            }
                        })
                    } else {
                        return false
                    }
                })
            },
            edit(row) {
                this.loginForm = row
                this.dialogVisible = true
            },
            search() {
                if (this.inputVal.length > 0) {
                    this.$axios.post('/searchuser', {
                        val: this.inputVal
                    }).then((data) => {
                        if (data.success) {
                            this.tableData = data.data.data
                        } else {
                            this.$message({
                                message: data.message,
                                type: data.success ? 'success' : 'error'
                            })
                        }
                    })
                } else {
                    this.getData()
                }
            },
            add() {
                this.$router.push('/user/add')
            },
            getData() {
                let _this = this
                _this.$axios.post('/userlist').then((data) => {
                    if (data.success) {
                        _this.tableData = data.data.data
                    } else {
                        this.$message({
                            message: data.message,
                            type: data.success ? 'success' : 'error'
                        })
                    }
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped>

</style>