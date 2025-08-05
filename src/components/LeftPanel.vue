<template>
  <div class="left-panel">
    <div class="logo">
      <i class="fas fa-graduation-cap logo-icon floating"></i>
      <div class="logo-text">CampusLife</div>
    </div>

    <div class="title">大学生一站式服务分析</div>

    <div class="success-badge">
      <h2>SUCCESS</h2>
    </div>

    <div class="features">
      <FeatureItem
          v-for="(feature, index) in features"
          :key="index"
          :icon="feature.icon"
          :title="feature.title"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FeatureItem from './FeatureItem.vue'

const features = ref([
  { icon: 'fas fa-book-open', title: '课堂分析' },
  { icon: 'fas fa-briefcase', title: '就业分析' },
  { icon: 'fas fa-heart', title: '恋爱分析' },
  { icon: 'fas fa-users', title: '社交分析' }
])
</script>

<style scoped>
.left-panel {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: rgba(0, 30, 60, 0.7);
  color: white;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.logo-icon {
  font-size: 32px;
  margin-right: 15px;
  color: #4dabf7;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  background: linear-gradient(45deg, #4dabf7, #da77f2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(77, 171, 247, 0.3);
}

.title {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 1px;
  background: linear-gradient(45deg, #ffd43b, #ffa94d);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleGlow 3s infinite alternate;
}

@keyframes titleGlow {
  0% { text-shadow: 0 0 5px rgba(255, 212, 59, 0.5); }
  100% { text-shadow: 0 0 20px rgba(255, 212, 59, 0.8), 0 0 30px rgba(255, 212, 59, 0.6); }
}

.success-badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 40px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s, box-shadow 0.4s;
}

.success-badge:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.success-badge h2 {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: 3px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #ff6b6b, #ffa8a8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .left-panel {
    padding: 30px;
  }

  .title {
    font-size: 28px;
  }

  .success-badge h2 {
    font-size: 36px;
  }
}

/* 浮动动画 */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.floating {
  animation: float 4s ease-in-out infinite;
}
</style>