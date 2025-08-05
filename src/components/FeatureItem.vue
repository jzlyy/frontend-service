<template>
  <div class="feature-item" @click="handleClick">
    <div class="feature-icon">
      <i :class="icon"></i>
    </div>
    <div class="feature-title">{{ title }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,
  title: String
})

const emit = defineEmits(['feature-click'])

const handleClick = () => {
  emit('feature-click', props.title)
}
</script>

<style scoped>
.feature-item {
  background: rgba(255, 255, 255, 0.08);
  padding: 25px 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.feature-item:hover {
  transform: translateY(-8px) scale(1.03);
  background: rgba(77, 171, 247, 0.2);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border-color: rgba(77, 171, 247, 0.4);
}

.feature-icon {
  font-size: 36px;
  margin-bottom: 15px;
  color: #4dabf7;
  transition: all 0.4s;
}

.feature-item:hover .feature-icon {
  color: #ffd43b;
  transform: rotateY(360deg);
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
}
</style>