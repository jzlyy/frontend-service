<template>
  <form @submit.prevent="login">
    <div class="form-group">
      <label for="username">账号</label>
      <div class="input-with-icon">
        <i class="fas fa-user"></i>
        <input type="text" id="username" class="form-control" placeholder="用户名/邮箱" v-model="username" required>
      </div>
    </div>

    <div class="form-group">
      <label for="password">密码</label>
      <div class="input-with-icon">
        <i class="fas fa-lock"></i>
        <input type="password" id="password" class="form-control" placeholder="密码" v-model="password" required>
      </div>
    </div>

    <div class="options">
      <div class="remember-me">
        <input type="checkbox" id="remember" v-model="remember">
        <label for="remember">记住我</label>
      </div>
      <a href="#" class="forgot-password">忘记密码?</a>
    </div>

    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>

    <button type="submit" class="login-btn" :disabled="isLoading">
      <span v-if="!isLoading">登 录</span>
      <span v-else><i class="fas fa-spinner fa-spin"></i> 登录中...</span>
    </button>

    <div class="register-link">
      还没有账号? <router-link to="/register">立即注册</router-link>
    </div>

    <div class="divider">或使用第三方登录</div>

    <div class="social-login">
      <div class="social-btn wechat" @click="socialLogin('wechat')">
        <i class="fab fa-weixin"></i>
      </div>
      <div class="social-btn qq" @click="socialLogin('qq')">
        <i class="fab fa-qq"></i>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api.js'

const router = useRouter()
const username = ref('')
const password = ref('')
const remember = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const login = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await api.login(username.value, password.value)
    localStorage.setItem('token', response.data.token)

    if (remember.value) {
      localStorage.setItem('username', username.value)
    } else {
      localStorage.removeItem('username')
    }

    showSuccessMessage()
    await router.push('/dashboard')
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = '用户名或密码错误'
    } else {
      errorMessage.value = '登录失败，请稍后重试'
    }
  } finally {
    isLoading.value = false
  }
}

const savedUsername = localStorage.getItem('username')
if (savedUsername) {
  username.value = savedUsername
  remember.value = true
}

const showSuccessMessage = () => {
  alert(`登录成功！\n欢迎来到校园二手交易平台，${username.value}！`)
}

const socialLogin = (platform) => {
  const platforms = {
    'wechat': '微信',
    'qq': 'QQ'
  }
  alert(`正在通过${platforms[platform] || platform}登录...`)
}
</script>

<style scoped>
.form-group {
  margin-bottom: 25px;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
  padding-left: 5px;
}

.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  font-size: 18px;
  transition: all 0.3s;
}

.error-message {
  color: #e74c3c;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 16px 16px 16px 50px;
  border: 2px solid #e0e6ed;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.8);
}

.form-control:focus {
  border-color: #2ecc71;
  outline: none;
  box-shadow: 0 0 0 4px rgba(46, 204, 113, 0.2);
  padding-left: 55px;
}

.form-control:focus + i {
  color: #2ecc71;
  left: 18px;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 8px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.forgot-password {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.forgot-password:hover {
  color: #2980b9;
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(90deg, #2ecc71, #27ae60);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 6px 15px rgba(46, 204, 113, 0.4);
  position: relative;
  overflow: hidden;
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(46, 204, 113, 0.5);
}

.login-btn:active {
  transform: translateY(1px);
}

.register-link {
  text-align: center;
  margin-top: 25px;
  color: #7f8c8d;
}

.register-link a {
  color: #2ecc71;
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
  position: relative;
}

.register-link a:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #2ecc71;
  transition: width 0.3s;
}

.register-link a:hover:after {
  width: 100%;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #95a5a6;
  margin: 25px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e0e6ed;
}

.divider::before {
  margin-right: 15px;
}

.divider::after {
  margin-left: 15px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 15px;
}

.social-btn {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.social-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.social-btn.wechat {
  background: linear-gradient(45deg, #09bb07, #2add1c);
}

.social-btn.qq {
  background: linear-gradient(45deg, #12b7f5, #0a9bd9);
}
</style>