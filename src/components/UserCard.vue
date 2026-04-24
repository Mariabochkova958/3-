<template>
  <div class="user-card">
    <div v-if="!isEditing" class="view-mode">
      <h2 class="user-name">{{ name }}</h2>
      <button class="edit-btn" @click="startEdit">✏️ едактировать</button>
    </div>
    
    <div v-else class="edit-mode">
      <input 
        v-model="tempName" 
        type="text" 
        class="name-input"
        @keyup.enter="save"
        placeholder="ведите имя"
      />
      <div class="edit-buttons">
        <button class="save-btn" @click="save">✅ Сохранить</button>
        <button class="cancel-btn" @click="cancel">❌ тмена</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['name-changed'])

const isEditing = ref(false)
const tempName = ref('')

function startEdit() {
  tempName.value = props.name
  isEditing.value = true
}

function save() {
  if (tempName.value.trim()) {
    emit('name-changed', tempName.value.trim())
  }
  isEditing.value = false
}

function cancel() {
  isEditing.value = false
  tempName.value = ''
}
</script>

<style scoped>
.user-card {
  width: 100%;
}

.view-mode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 24px;
  font-weight: 600;
  color: #4A3728;
  margin: 0;
  padding: 8px 16px;
  background: #F5F0E6;
  border-radius: 12px;
  display: inline-block;
}

.edit-btn {
  background: #C4A27A;
  color: #4A3728;
  border: none;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.edit-btn:hover {
  background: #8B1E1E;
  color: #F5F0E6;
}

.edit-mode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.name-input {
  width: 80%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #C4A27A;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s;
  background: #F5F0E6;
}

.name-input:focus {
  border-color: #8B1E1E;
}

.edit-buttons {
  display: flex;
  gap: 12px;
}

.save-btn {
  background: #4A3728;
  color: #F5F0E6;
  border: none;
  padding: 8px 20px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s;
}

.save-btn:hover {
  background: #2E5D3A;
}

.cancel-btn {
  background: #C4A27A;
  color: #4A3728;
  border: none;
  padding: 8px 20px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: #8B1E1E;
  color: #F5F0E6;
}
</style>
