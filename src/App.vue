<template>
  <div id="app">
    <ParticlesBackground />
    <div class="container">
      <LeftPanel />
      <router-view /> <!-- 路由出口，替换原有的 LoginPanel -->
    </div>
  </div>
</template>

<script setup>
import LeftPanel from './components/LeftPanel.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'
</script>
