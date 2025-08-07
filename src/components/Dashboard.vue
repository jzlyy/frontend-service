<template>
  <div class="dashboard">
    <h1>欢迎回来, {{ user.username }}!</h1>
    <p>邮箱: {{ user.email }}</p>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

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
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
}
</style>