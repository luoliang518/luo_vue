<template>
  <div class="login-container">
    <div class="background"></div>
    <el-form :model="loginForm" class="login-form" @submit.prevent="handleLogin">
      <div class="form-group">
        <label class="form-label">账号：</label>
        <el-input v-model="loginForm.account" placeholder="请输入用户名/手机号" class="input-field"></el-input>
      </div>
      <div class="form-group">
        <label class="form-label">密码：</label>
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" class="input-field"></el-input>
      </div>
      <div class="button-container">
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="submit-button">登录</el-button>
          <el-button type="default" @click="goToRegister" class="register-button">注册</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin() {
      this.$axios.post('/auth/user/userLogin', {
        account: this.loginForm.account,
        password: this.loginForm.password
      }).then(response => {
        if (response) {
          localStorage.setItem('token', response.data.token.token)
          this.$router.push('/home')
        }
      })
    },
    goToRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style>
/* 确保 HTML 和 body 元素占满整个窗口 */
/* html, body {
  height: 100%;
  margin: 0;
  overflow: hidden;
} */

/* 登录容器样式 */
.login-container {
  position: relative;
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 2;
}

/* 背景图样式 */
.background {
  position: absolute; /* 确保背景图定位到视口的绝对位置 */
  top: 0;
  left: 0;
  width: 100%; /* 背景图宽度占满整个视口 */
  height: 100%; /* 背景图高度占满整个视口 */
  background-image: url('/public/sunset-over-the-sea-2536787_1920.jpg'); /* 背景图路径 */
  background-size: cover; /* 确保背景图覆盖整个容器 */
  background-position: center; /* 背景图居中 */
  background-repeat: no-repeat; /* 避免背景图重复 */
}

/* 登录表单样式 */
.login-form {
  background: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  padding: 20px;
  border-radius: 8px;
  width: 100%; /* 确保表单宽度占满容器 */
  max-width: 400px; /* 最大宽度控制 */
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 输入框样式 */
.input-field {
  width: 100%; /* 输入框宽度占满表单项 */
}

/* 表单组样式 */
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 增加表单项之间的间距 */
}

/* 描述文本样式 */
.form-label {
  margin-right: 20px; /* 增加描述文本和输入框之间的间距 */
  font-size: 16px; /* 标签字体大小 */
  color: #ffffff; /* 标签字体颜色 */
  font-weight: bold; /* 标签字体加粗 */
  min-width: 70px; /* 确保标签宽度一致 */
  text-align: right; /* 右对齐标签 */
}

/* 表单项样式 */
.form-item {
  flex: 1; /* 确保输入框占满剩余空间 */
}

/* 按钮容器样式 */
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* 按钮样式 */
.submit-button {
  margin-right: 10px; /* 登录按钮右侧间距 */
}
</style>
