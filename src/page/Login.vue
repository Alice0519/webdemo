<template>
  <el-row class="login" justify="center" align="middle">
    <el-col :span="6">
      <el-card>
        <el-image style="width: 100px;" :src="logoUrl" />
        <div>
          <el-form ref="loginForm" :model="loginForm" status-icon label-width="40px">
            <el-form-item label="账户" prop="name">
              <el-input v-model="loginForm.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" />
            </el-form-item>
            <el-form-item>
              <el-button>忘记密码</el-button>
              <el-button>注册</el-button>
              <el-button type="primary">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      logoUrl: "/logo.webp",
      loginForm: {
        name: "",
        password: ""
      }
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
