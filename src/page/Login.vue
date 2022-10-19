<template>
  <el-row class="login" justify="center" align="middle">
    <el-col :span="8">
      <el-card :header="title">
        <el-image v-if="type=='login'" style="width: 100px;" :src="logoUrl" />
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
            <el-form-item prop="verifyCode" v-if="type=='forget'">
              <el-input v-model="loginForm.verifyCode" style="width: 280px;margin-right:10px;"
                :placeholder="loginFormPlaceholder.verifyCodePlaceholder" />
              <el-button type="primary" @click="getVerifyCode" :disabled="isCodeDisabled">{{verifyCodeTip}}</el-button>
            </el-form-item>
            <el-form-item v-if="type=='login'">
              <el-button @click="clear('forget')">忘记密码</el-button>
              <el-button @click="clear('register')">注册</el-button>
              <el-button type="primary" @click="login">登录</el-button>
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
  import crypto from '../utils/crypto'
  import storage from '../utils/storage'
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

        if (value != this.loginForm.password) callback(new Error(this.loginFormPlaceholder.confirmpassPlaceholder))
        callback()
      }

      return {
        isCodeDisabled: false,
        verifyCodeTip: "获取验证码",
        logoUrl: "/logo.webp",
        type: "login", //取值：register,forget
        loginForm: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          verifyCode: Number
        },
        initLoginForm: {
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        },
        loginFormPlaceholder: {
          namePlaceholder: "3-10个英文或中文字符",
          emailPlaceholder: "请输入正确邮箱地址",
          passPlaceholder: "6-12个英文和数字组成的字符",
          confirmpassPlaceholder: "密码错误，请重新输入",
          verifyCodePlaceholder: "请输入邮件验证码"
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
              trigger: ['blur', 'change']
            },
          ],
          verifyCode: [{
            required: true,
            message: require,
            trigger: 'blur'
          }]
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
      getVerifyCode() {
        let _this = this
        _this.$refs.loginForm.validateField('email', valid => {
          if (valid) {
            _this.sendMail()
            _this.setVerifyCodeTip()
          }
        })
      },

      sendMail() {
        let param = {
          email: this.loginForm.email
        }
        this.$axios.post('/sendmail', param)
      },
      setVerifyCodeTip() {
        let time = 60
        let getTip = setInterval(() => {
          time--
          this.verifyCodeTip = `请${time}s之后再试`
          this.isCodeDisabled = true
          if (time == 0) {
            this.verifyCodeTip = '获取验证码'
            this.isCodeDisabled = false
            clearInterval(getTip)
          }
        }, 1000)
      },
      login() {
        let _this = this
        _this.$refs.loginForm.validate((valid) => {
          if (valid) {
            storage.remove('userInfo')
            let param = {
              name: _this.loginForm.name,
              password: crypto.encrypt(_this.loginForm.password)
            }

            _this.$axios.post('/login', param).then((data) => {
              if (data.success) {
                storage.set('userInfo', data.data.userInfo)
                _this.$router.push('/user/list')
                _this.clear()
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
      sure() {
        let _this = this
        _this.$refs.loginForm.validate((valid) => {
          if (valid) {
            if (_this.type == 'register') {
              _this.register()
            } else if (_this.type == 'forget') {
              _this.findpass()
            }
          } else {
            return false
          }
        })
      },
      register() {
        let _this = this
        let param = {
          name: _this.loginForm.name,
          email: _this.loginForm.email,
          password: crypto.encrypt(_this.loginForm.password)
        }

        _this.$axios.post('/register', param).then((data) => {
          _this.$message({
            message: data.message,
            type: data.success ? 'success' : 'error'
          })
          if (data.success) {
            _this.clear('login')
          }
        })
      },
      findpass() {
        let _this = this
        let param = {
          email: _this.loginForm.email,
          password: crypto.encrypt(_this.loginForm.password),
          verifyCode: _this.loginForm.verifyCode
        }

        _this.$axios.post('/findpass', param).then((data) => {
          _this.$message({
            message: data.message,
            type: data.success ? 'success' : 'error'
          })
          if (data.success) {
            _this.clear('login')
          }
        })
      },
      clear(type) {
        if (type) {
          this.type = type
        }

        this.loginForm = this.initLoginForm
        this.$refs.loginForm.resetFields()
      }
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