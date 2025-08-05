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

    <button type="submit" class="login-btn" @click="createRipple">登 录</button>

    <div class="register-link">
      还没有账号? <a href="#">立即注册</a>
    </div>

    <div class="social-login">
      <div class="social-btn wechat" @click="socialLogin('wechat')">
        <i class="fab fa-weixin"></i>
      </div>
      <div class="social-btn qq" @click="socialLogin('qq')">
        <i class="fab fa-qq"></i>
      </div>
      <div class="social-btn weibo" @click="socialLogin('weibo')">
        <i class="fab fa-weibo"></i>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const remember = ref(false)

const login = () => {
  if (username.value && password.value) {
    showSuccessMessage()
  } else {
    alert('请输入用户名和密码')
  }
}

const createRipple = (event) => {
  const button = event.target
  const ripple = document.createElement('span')
  ripple.classList.add('ripple')

  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.width = ripple.style.height = size + 'px'
  ripple.style.left = x + 'px'
  ripple.style.top = y + 'px'

  button.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

const showSuccessMessage = () => {
  alert(`登录成功！\n欢迎回来，${username.value}！\n将为您提供个性化校园服务`)
}

const socialLogin = (platform) => {
  const platforms = {
    'wechat': '微信',
    'qq': 'QQ',
    'weibo': '微博'
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
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.2);
  padding-left: 55px;
}

.form-control:focus + i {
  color: #3498db;
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
  background: linear-gradient(90deg, #3498db, #2c3e50);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 6px 15px rgba(52, 152, 219, 0.4);
  position: relative;
  overflow: hidden;
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.5);
}

.login-btn:active {
  transform: translateY(1px);
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple 0.6s linear;
}

@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}

.register-link {
  text-align: center;
  margin-top: 25px;
  color: #7f8c8d;
}

.register-link a {
  color: #3498db;
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
  background: #3498db;
  transition: width 0.3s;
}

.register-link a:hover:after {
  width: 100%;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.social-btn:hover {
  transform: translateY(-5px);
}

.social-btn.wechat {
  background: linear-gradient(45deg, #2aae67, #1e9e5a);
}

.social-btn.qq {
  background: linear-gradient(45deg, #12b7f5, #0a9bd9);
}

.social-btn.weibo {
  background: linear-gradient(45deg, #e6162d, #cc1428);
}
</style>