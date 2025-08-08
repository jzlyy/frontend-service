<template>
  <form @submit.prevent="register">
    <!-- 用户名 -->
    <div class="form-group">
      <label for="reg-username">用户名</label>
      <div class="input-with-icon">
        <i class="fas fa-user"></i>
        <input
            type="text"
            id="reg-username"
            class="form-control"
            placeholder="请设置用户名"
            v-model="username"
            required
            @blur="validateUsername"
        >
      </div>
      <!-- 内联错误提示 -->
      <p class="error-message" v-if="usernameError">{{ usernameError }}</p>
    </div>

    <!-- 邮箱 -->
    <div class="form-group">
      <label for="reg-email">邮箱</label>
      <div class="input-with-icon">
        <i class="fas fa-envelope"></i>
        <input
            type="email"
            id="reg-email"
            class="form-control"
            placeholder="请输入邮箱"
            v-model="email"
            required
            @blur="validateEmail"
        >
      </div>
      <p class="error-message" v-if="emailError">{{ emailError }}</p>
    </div>

    <!-- 密码 -->
    <div class="form-group">
      <label for="reg-password">密码(要求大写字母、小写字母、数字和特殊字符中的三种)</label>
      <div class="input-with-icon">
        <i class="fas fa-lock"></i>
        <input
            type="password"
            id="reg-password"
            class="form-control"
            placeholder="请设置密码(至少8位)"
            v-model="password"
            required
            @input="checkPasswordStrength"
        >
      </div>
      <!-- 密码强度提示 -->
      <div class="password-strength" v-if="password">
        <div
            class="strength-bar"
            :style="{ width: passwordStrength.width, background: passwordStrength.color }"
        ></div>
        <p class="strength-text">{{ passwordStrength.text }}</p>
      </div>
    </div>

    <!-- 确认密码 -->
    <div class="form-group">
      <label for="reg-confirm">确认密码</label>
      <div class="input-with-icon">
        <i class="fas fa-lock"></i>
        <input
            type="password"
            id="reg-confirm"
            class="form-control"
            placeholder="请确认密码"
            v-model="confirmPassword"
            required
            @blur="validateConfirmPassword"
        >
      </div>
      <p class="error-message" v-if="confirmError">{{ confirmError }}</p>
    </div>

    <!-- 注册按钮（带加载状态） -->
    <button
        type="submit"
        class="register-btn"
        @click="createRipple"
        :disabled="isLoading"
    >
      <span v-if="!isLoading">注 册</span>
      <span v-if="isLoading" class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i> 注册中...
      </span>
    </button>

    <div class="register-link">
      已有账号? <router-link to="/login">立即登录</router-link>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
// 错误提示
const usernameError = ref('')
const emailError = ref('')
const confirmError = ref('')
// 密码强度
const passwordStrength = ref({ width: '0%', color: '', text: '' })

// 验证用户名
const validateUsername = () => {
  if (username.value.length < 3) {
    usernameError.value = '用户名至少3个字符'
  } else {
    usernameError.value = ''
  }
}

// 验证邮箱格式
const validateEmail = () => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!reg.test(email.value)) {
    emailError.value = '请输入有效的邮箱地址'
  } else {
    emailError.value = ''
  }
}

// 检查密码强度
const checkPasswordStrength = () => {
  // 统一字母正则（包含大小写）
  const hasLetter = /[a-zA-Z]/.test(password.value);
  const hasNumber = /[0-9]/.test(password.value);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password.value); // 非字母数字即为特殊字符

  if (password.value.length < 8) { // 注意：原提示文本是"至少8位"，这里同步修正判断条件
    passwordStrength.value = {
      width: '30%',
      color: '#e74c3c',
      text: '弱：至少8位字符'
    };
  } else if (hasLetter && hasNumber && hasSpecial) {
    // 强：同时包含字母（大小写均可）、数字、特殊字符
    passwordStrength.value = {
      width: '100%',
      color: '#2ecc71',
      text: '强：包含字母、数字和特殊字符'
    };
  } else if (hasLetter && hasNumber) {
    // 中：包含字母和数字（无特殊字符）
    passwordStrength.value = {
      width: '70%',
      color: '#f39c12',
      text: '中：包含字母和数字'
    };
  } else {
    // 其他情况（如仅字母、仅数字、字母+特殊字符等）
    passwordStrength.value = {
      width: '50%',
      color: '#f39c12',
      text: '中：建议增加复杂度'
    };
  }
};

// 验证确认密码
const validateConfirmPassword = () => {
  if (password.value !== confirmPassword.value) {
    confirmError.value = '两次输入的密码不一致'
  } else {
    confirmError.value = ''
  }
}



// 注册逻辑
const register = async () => {
  // 触发所有验证
  validateUsername()
  validateEmail()
  validateConfirmPassword()

  // 若有错误则阻止提交
  if (usernameError.value || emailError.value || confirmError.value) {
    return
  }

  isLoading.value = true

  try {
    const response = await api.register({
      username: username.value,
      email: email.value,
      password: password.value
    })

    alert(`注册成功！欢迎您，${username.value}`)
    await router.push('/login')
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data.message || '注册失败，请检查输入')
    } else {
      alert('注册失败，请稍后重试')
    }
  } finally {
    isLoading.value = false
  }
}

// 水波纹效果（复用登录按钮逻辑）
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
  setTimeout(() => ripple.remove(), 600)
}
</script>

<style scoped>
/* 复用登录表单基础样式，增强交互效果 */
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
  padding: 16px 18px 16px 50px;
  border: 2px solid #e0e6ed;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.9);
}

/* 增强焦点状态 */
.form-control:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.2);
  padding-left: 55px;
  transform: translateY(-2px); /* 微小上浮效果 */
}

.form-control:focus + i {
  color: #3498db;
  left: 18px;
  transform: translateY(-50%) scale(1.1); /* 图标缩放 */
}

/* 错误提示样式 */
.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 5px;
  height: 20px; /* 固定高度，避免布局跳动 */
}

/* 密码强度样式 */
.password-strength {
  margin-top: 8px;
}

.strength-bar {
  height: 6px;
  border-radius: 3px;
  transition: width 0.3s, background 0.3s;
}

.strength-text {
  font-size: 14px;
  margin-top: 5px;
  color: #666;
}

/* 注册按钮样式（与登录按钮区分但协调） */
.register-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(90deg, #2ecc71, #27ae60); /* 绿色渐变，区分登录按钮的蓝色 */
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

.register-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(46, 204, 113, 0.5);
}

.register-btn:active {
  transform: translateY(1px);
}

.register-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  box-shadow: none;
}

/* 加载状态样式 */
.loading-spinner i {
  margin-right: 8px;
}

/* 底部链接样式优化 */
.register-link {
  text-align: center;
  margin-top: 30px;
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

/* 水波纹动画 */
@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}

</style>