<template>
  <div id="app">
    <ParticlesBackground />
    <div class="container">
      <LeftPanel />
      <router-view /> <!-- 路由出口 -->
    </div>
  </div>
</template>

<script setup>
import LeftPanel from './components/common/LeftPanel.vue'
import ParticlesBackground from './components/common/ParticlesBackground.vue'
</script>
