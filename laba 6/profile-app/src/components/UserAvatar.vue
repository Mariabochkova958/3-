<template>
  <div class="avatar-container">
    <div class="circle" :style="{ backgroundColor: colors[currentIndex] }">
      <span class="initials">{{ initials }}</span>
    </div>
    <button class="color-btn" @click="changeColor">🎨 Сменить цвет</button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['name'])
const emit = defineEmits(['color-changed'])

const colors = ['#8B1E1E', '#C4A27A', '#4A3728', '#A0522D', '#6B3A2A']
const currentIndex = ref(0)

const initials = computed(() => {
  return props.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

function changeColor() {
  currentIndex.value = (currentIndex.value + 1) % colors.length
  emit('color-changed', colors[currentIndex.value])
}
</script>

<style scoped>
.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border: 3px solid #F5F0E6;
}

.initials {
  color: #F5F0E6;
  font-size: 36px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.color-btn {
  background: #4A3728;
  color: #F5F0E6;
  border: none;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.color-btn:hover {
  background: #8B1E1E;
  transform: scale(1.02);
}

.color-btn:active {
  transform: scale(0.98);
}
</style>