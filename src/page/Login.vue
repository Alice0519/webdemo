<template>
  <el-row class="login" justify="center" align="middle">
    <el-col :span="8">
      <el-card :header="title">
        <el-image v-if="type=='login'" style="width: 100px;" :src="logoUrl" />
        {{test}}
        <div>
          <el-form ref="loginForm" :model="loginForm" status-icon label-width="80px" :rules="rules">
            <el-form-item label="账户" prop="name" v-if="type !='forget'">
              <el-input v-model="loginForm.name" :placeholder="loginFormPlaceholder.namePlaceholder" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email" v-if="type !='login'">
              <el-input v-model="loginForm.email" type="email" :placeholder="loginFormPlaceholder.emailPlaceholder" />
            </el-form-item>
            <el-form-item :label="passwordLabel" prop="password">
              <el-input v-model="loginForm.password" type="password"
                :placeholder="loginFormPlaceholder.passPlaceholder" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword" v-if="type!='login'">
              <el-input v-model="loginForm.confirmPassword" type="password"
                :placeholder="loginFormPlaceholder.passPlaceholder" />
            </el-form-item>
            <el-form-item v-if="type=='login'">
              <el-button @click="clear('forget')">忘记密码</el-button>
              <el-button @click="clear('register')">注册</el-button>
              <el-button type="primary" @click="clear('login')">登录</el-button>
            </el-form-item>
            <el-form-item v-if="type!='login'">
              <el-button @click="clear('login')">取消</el-button>
              <el-button type="primary" @click="sure">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  const require = "必填"
  export default {
    data() {
      const validateName = (rule, value, callback) => {
        if (!/^[\u4e00-\u9fa5a-zA-Z]{3,10}$/.test(value)) {
          callback(new Error(this.loginFormPlaceholder.namePlaceholder))
        }
        callback()
      }

      const validatePass = (rule, value, callback) => {
        if (!/^[0-9a-zA-Z]{6,12}$/.test(value)) {
          callback(new Error(this.loginFormPlaceholder.passPlaceholder))
        }
        callback()
      }

      const validateConfirmpass = (rule, value, callback) => {
        if (!/^[0-9a-zA-Z]{6,12}$/.test(value)) {
          callback(new Error(this.loginFormPlaceholder.passPlaceholder))
        }

        if(value != this.loginForm.password) callback(new Error(this.loginFormPlaceholder.confirmpassPlaceholder))
        callback()
      }

      return {
        logoUrl: "/logo.webp",
        type: "login", //取值：register,forget
        loginForm: {
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        },
        initLoginForm:{
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        },
        loginFormPlaceholder: {
          namePlaceholder: "3-10个英文或中文字符",
          emailPlaceholder: "请输入正确邮箱地址",
          passPlaceholder: "6-12个英文和数字组成的字符",
          confirmpassPlaceholder:"密码错误，请重新输入"
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
              message:'请输入正确邮箱地址',
              trigger: ['blur','change']
            },
          ],
          password: [{
              required: true,
              message: require,
              trigger: 'blur'
            },
            {
              validator: validatePass,
              trigger: 'change'
            },
          ],
          confirmPassword: [{
              required: true,
              message: require,
              trigger: 'blur'
            },
            {
              validator: validateConfirmpass,
              trigger: ['blur','change']
            },
          ],
        }
      }
    },
    computed: {
      title() {
        return this.type == "register" ? "用户注册" : ((this.type == "forget") ? "忘记密码" : null)
      },
      passwordLabel() {
        return this.type == 'forget' ? '新密码' : '密码'
      }
    },
    methods: {
      sure() {
        //this.type = 'login'
        
        if(!this.$refs.loginForm.validate()){
          console.log('111 loginForm = ',this.loginForm)
        }
      },
      clear(type){
        this.type = type
        this.loginForm = this.initLoginForm
        this.$refs.loginForm.resetFields()
      }
    },
    created(){
      this.$axios.get('register').then(res=>{
        console.log(111,res)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    width: calc(100%);
    height: calc(100%);
    background: url('/banner.png') no-repeat center;
  }
</style>