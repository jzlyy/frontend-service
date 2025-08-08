<template>
  <div class="right-panel">
    <div class="login-header">
      <h2>用户注册</h2>
      <p>加入校园二手交易社区</p>
      <div class="header-divider"></div>
    </div>
    <RegisterForm />
  </div>
</template>

<style scoped>
.right-panel {
  flex: 1;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0 20px 20px 0;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-header h2 {
  font-size: 36px;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 15px;
  background: linear-gradient(45deg, #2ecc71, #3498db);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-header p {
  color: #666;
  font-size: 16px;
  margin-top: 0;
}

.header-divider {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #2ecc71, #3498db);
  border-radius: 3px;
  margin: 10px auto 0;
}
</style>

<script setup lang="ts">
import RegisterForm from "./RegisterForm.vue";
</script>