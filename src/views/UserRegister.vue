<template>
  <div class="register-container">
    <div class="background"></div>
    <el-form :model="registerForm" class="register-form" @submit.prevent="handleRegister">
      <div class="form-group">
        <label class="form-label">用户名：</label>
        <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
      </div>
      <div class="form-group">
        <label class="form-label">账号：</label>
        <el-input v-model="registerForm.account" placeholder="账号" class="input-field"></el-input>
      </div>
      <div class="form-group">
        <label class="form-label">密码：</label>
        <el-input v-model="registerForm.password" type="password" placeholder="密码"></el-input>
      </div>
      <div class="form-group">
        <label class="form-label">邮箱：</label>
        <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
        <el-button :disabled="isCounting" @click="sendVerificationCode">{{ countdownText }}</el-button>
      </div>
      <div class="form-group">
        <label class="form-label">验证码：</label>
        <el-input v-model="registerForm.verificationCodeCommand.code" placeholder="验证码"></el-input>
      </div>
      <div class="button-container">
        <el-form-item>
          <el-button type="primary" @click="handleRegister">注册</el-button>
          <el-button type="default" @click="goToLogin" class="register-button">返回登录</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<script>
export default {
  name: 'UserRegister',
  data() {
    return {
      registerForm: {
        username: '',
        account: '',
        password: '',
        email: '',
        verificationCodeCommand: {
          phoneNumber: '',
          email: '',
          code: ''
        }
      },
      countdown: 60,
      isCounting: false,
      intervalId: null
    };
  },
  computed: {
    countdownText() {
      return this.isCounting ? `${this.countdown}秒后重发` : '发送验证码';
    }
  },
  methods: {
    sendVerificationCode() {
      if (this.isCounting) return; // 避免重复发送
      this.isCounting = true;
      this.$axios.post('/auth/user/sendCode', {
        email: this.registerForm.email
      })
      .then(response => {
        this.startCountdown(response.data.expiration);
      })
      .catch(() => {
        this.isCounting = false;
      });
    },
    startCountdown(expiration) {
      this.countdown = expiration || 60;
      this.intervalId = setInterval(() => {
        if (this.countdown > 1) {
          this.countdown--;
        } else {
          clearInterval(this.intervalId);
          this.isCounting = false;
        }
      }, 1000);
    },
    handleRegister() {
      this.$axios.post('/auth/user/userRegistration', {
        username: this.registerForm.username,
        account: this.registerForm.account,
        password: this.registerForm.password,
        verificationCodeCommand: {
          phoneNumber: this.registerForm.verificationCodeCommand.phoneNumber,
          email: this.registerForm.email,
          code: this.registerForm.verificationCodeCommand.code
        }
      })
      .then(response => {
        if (response && response.success) {
          this.$router.push('/');
        }
      });
    },
    goToLogin() {
      this.$router.push('/');
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  }
};
</script>

<style>
.register-container {
  position: relative;
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 2;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/public/sunset-over-the-sea-2536787_1920.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.register-form {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.input-field {
  width: 100%;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-label {
  margin-right: 20px;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  min-width: 70px;
  text-align: right;
}

.form-item {
  flex: 1;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.submit-button {
  margin-right: 10px;
}
</style>
