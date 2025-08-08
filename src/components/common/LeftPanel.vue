<template>
  <div class="left-panel">
    <div class="logo">
      <i class="fas fa-recycle logo-icon floating"></i>
      <div class="logo-text">CampusTrade</div>
    </div>

    <div class="title">校园二手交易平台</div>

    <div class="slogan">
      <h2>闲置变现 · 绿色校园</h2>
    </div>

    <div class="features">
      <FeatureItem
          v-for="(feature, index) in features"
          :key="index"
          :icon="feature.icon"
          :title="feature.title"
      />
    </div>

    <div class="stats">
      <div class="stat-item">
        <div class="stat-value">1000+</div>
        <div class="stat-label">活跃用户</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">10000+</div>
        <div class="stat-label">成交商品</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FeatureItem from './FeatureItem.vue'

const features = ref([
  { icon: 'fas fa-book', title: '教材交易' },
  { icon: 'fas fa-laptop', title: '数码产品' },
  { icon: 'fas fa-tshirt', title: '服饰箱包' },
  { icon: 'fas fa-bicycle', title: '代步工具' }
])
</script>

<style scoped>
.left-panel {
  flex: 1;
  padding: 60px 70px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: rgba(0, 40, 30, 0.85);
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
  color: #2ecc71;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  background: linear-gradient(45deg, #2ecc71, #3498db);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(46, 204, 113, 0.3);
}

.title {
  font-size: 41px;
  font-weight: 800;
  margin-bottom: 40px;
  text-align: center;
  letter-spacing: 1px;
  background: linear-gradient(45deg, #2ecc71, #f1c40f);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleGlow 3s infinite alternate;
}

@keyframes titleGlow {
  0% { text-shadow: 0 0 5px rgba(46, 204, 113, 0.5); }
  100% { text-shadow: 0 0 20px rgba(46, 204, 113, 0.8), 0 0 30px rgba(46, 204, 113, 0.6); }
}

.slogan {
  background: rgba(255, 255, 255, 0.1);
  padding: 23px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 50px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s, box-shadow 0.4s;
}

.slogan:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.slogan h2 {
  font-size: 42px;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #2ecc71, #f1c40f);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-top: auto;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  width: 45%;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #2ecc71;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .left-panel {
    padding: 30px;
  }

  .title {
    font-size: 28px;
  }

  .slogan h2 {
    font-size: 28px;
  }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.floating {
  animation: float 4s ease-in-out infinite;
}
</style>