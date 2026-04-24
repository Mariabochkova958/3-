<template>
  <div class="app">
    <div class="container">
      <h1 class="title">рофиль пользователя</h1>
      
      <div class="profile">
        <UserAvatar :name="name" @color-changed="handleColorChange" />
        <UserCard :name="name" @name-changed="updateName" />
      </div>
      
      <div class="info" v-if="currentColor">
        <p>Текущий цвет аватара: <span :style="{ color: currentColor }">{{ currentColor }}</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserAvatar from './components/UserAvatar.vue'
import UserCard from './components/UserCard.vue'

const name = ref('ртём ванов')
const currentColor = ref('')

function updateName(newName) {
  name.value = newName
}

function handleColorChange(color) {
  currentColor.value = color
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #F5F0E6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  background: #C4A27A;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 100%;
  margin: 20px;
}

.title {
  text-align: center;
  color: #F5F0E6;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 2px;
}

.profile {
  background: #F5F0E6;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.1);
}

.info {
  margin-top: 20px;
  text-align: center;
  padding: 12px;
  background: #4A3728;
  border-radius: 12px;
  color: #F5F0E6;
  font-size: 14px;
}

.info span {
  font-weight: bold;
  font-size: 16px;
}
</style>
