<template>
  <div class="dashboard">
    <h1>欢迎回来, {{ user.username }}!</h1>
    <p>邮箱: {{ user.email }}</p>

    <div class="stats">
      <div class="stat-card">
        <i class="fas fa-box-open"></i>
        <div class="stat-content">
          <div class="stat-value">12</div>
          <div class="stat-label">在售商品</div>
        </div>
      </div>

      <div class="stat-card">
        <i class="fas fa-handshake"></i>
        <div class="stat-content">
          <div class="stat-value">28</div>
          <div class="stat-label">成交记录</div>
        </div>
      </div>
    </div>

    <button @click="logout" class="logout-btn">退出登录</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api.js'

const router = useRouter()
const user = ref({})

onMounted(async () => {
  try {
    const response = await api.getProfile()
    user.value = response.data
  } catch (error) {
    await router.push('/login')
  }
})

const logout = async () => {
  try {
    await api.logout()
    localStorage.removeItem('token')
    await router.push('/login')
  } catch (error) {
    console.error('登出失败:', error)
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
}

.dashboard h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 40px 0;
}

.stat-card {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  width: 45%;
}

.stat-card i {
  font-size: 32px;
  color: #2ecc71;
  margin-right: 15px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
}

.stat-label {
  color: #7f8c8d;
  font-size: 14px;
}

.logout-btn {
  padding: 12px 30px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}
</style>