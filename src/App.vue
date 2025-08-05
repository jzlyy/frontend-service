<template>
  <div id="app">
    <ParticlesBackground />
    <div class="container">
      <LeftPanel />
      <LoginPanel />
    </div>
  </div>
</template>

<script setup>
import LeftPanel from './components/LeftPanel.vue'
import LoginPanel from './components/LoginPanel.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'
</script>
