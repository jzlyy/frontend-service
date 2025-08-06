<template>
  <div class="right-panel">
    <div class="login-header">
      <h2>用户注册</h2>
      <p>创建账号，开启校园智能生活</p>
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
  background: rgba(255, 255, 255, 0.95); /* 略微加深背景，提升对比度 */
  border-radius: 0 20px 20px 0; /* 与左侧面板圆角呼应 */
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
  /* 新增渐变文字 */
  background: linear-gradient(45deg, #3498db, #2c3e50);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-header p {
  color: #666; /* 加深文字颜色，提升可读性 */
  font-size: 16px;
  margin-top: 0; /* 调整间距 */
}

/* 新增标题下划线装饰 */
.header-divider {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #3498db, #2c3e50);
  border-radius: 3px;
  margin: 10px auto 0;
}
</style>
<script setup lang="ts">
import RegisterForm from "./RegisterForm.vue";
</script>