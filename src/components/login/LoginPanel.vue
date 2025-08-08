<template>
  <div class="right-panel">
    <div class="login-header">
      <h2>用户登录</h2>
      <p>让闲置物品重获新生</p>
    </div>

    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from './LoginForm.vue'
</script>

<style scoped>
.right-panel {
  flex: 1;
  padding: 70px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0 20px 20px 0;
}

.login-header {
  text-align: center;
  margin-bottom: 50px;
}

.login-header h2 {
  font-size: 36px;
  color: #2c3e50;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
}

.login-header h2:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #2ecc71, #3498db);
  border-radius: 2px;
}

.login-header p {
  color: #7f8c8d;
  font-size: 17px;
  margin-top: 20px;
}
</style>