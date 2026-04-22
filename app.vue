<template>
  <div class="container">
    <h1>📊 Семейный бюджет</h1>
    
    <!-- Форма добавления операции -->
    <div class="form-container">
      <h2>Добавить операцию</h2>
      <form @submit.prevent="addTransaction">
        <div class="form-group">
          <label>Название:</label>
          <input 
            type="text" 
            v-model.trim="title" 
            placeholder="Например: Зарплата, Продукты..."
            required
          >
        </div>
        
        <div class="form-group">
          <label>Сумма (₽):</label>
          <input 
            type="number" 
            v-model.number="amount" 
            placeholder="Доход: +, Расход: -"
            required
          >
        </div>
        
        <button type="submit" class="btn-add">➕ Добавить</button>
      </form>
    </div>
    
    <!-- История операций -->
    <div class="history-container">
      <h2>История операций</h2>
      
      <!-- Если операций нет -->
      <div v-if="history.length === 0" class="empty-message">
        📭 Вы не совершали финансовых операций
      </div>
      
      <!-- Если есть операции -->
      <ul v-else class="history-list">
        <li 
          v-for="item in history" 
          :key="item.id"
          :class="['history-item', item.amount > 0 ? 'income' : 'expense']"
        >
          <span class="item-text">{{ item.text }}</span>
          <span class="item-amount">
            {{ item.amount > 0 ? '+' : '' }}{{ item.amount }} ₽
          </span>
          <button @click="deleteTransaction(item.id)" class="btn-delete">❌</button>
        </li>
      </ul>
      
      <!-- Итоговый баланс -->
      <div class="balance" v-if="history.length > 0">
        <h3>Баланс: 
          <span :class="balance >= 0 ? 'positive' : 'negative'">
            {{ balance >= 0 ? '+' : '' }}{{ balance }} ₽
          </span>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // Реактивная переменная history - история операций
      history: [],
      // Переменные для формы
      title: '',
      amount: null
    }
  },
  computed: {
    // Подсчёт общего баланса
    balance() {
      return this.history.reduce((sum, item) => sum + item.amount, 0)
    }
  },
  methods: {
    // Добавление новой операции
    addTransaction() {
      // Проверка на пустые поля
      if (!this.title || this.amount === null || this.amount === '') {
        alert('Заполните все поля!')
        return
      }
      
      // Проверка на ноль
      if (this.amount === 0) {
        alert('Сумма не может быть равна 0')
        return
      }
      
      // Создаём новую операцию
      const newTransaction = {
        text: this.title,
        amount: this.amount,
        id: Date.now() // уникальный идентификатор
      }
      
      // Добавляем в массив history
      this.history.push(newTransaction)
      
      // Очищаем форму
      this.title = ''
      this.amount = null
    },
    
    // Удаление операции
    deleteTransaction(id) {
      this.history = this.history.filter(item => item.id !== id)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

h2 {
  color: #555;
  font-size: 20px;
  margin-bottom: 15px;
}

/* Стили для формы */
.form-container {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
}

.btn-add {
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-add:hover {
  background: #45a049;
}

/* Стили для истории */
.history-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
}

.empty-message {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 18px;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}

.history-item:hover {
  background: #f9f9f9;
}

.history-item.income {
  border-left: 4px solid #4CAF50;
}

.history-item.expense {
  border-left: 4px solid #f44336;
}

.item-text {
  font-size: 16px;
  color: #333;
  flex: 1;
}

.item-amount {
  font-weight: bold;
  margin: 0 15px;
}

.income .item-amount {
  color: #4CAF50;
}

.expense .item-amount {
  color: #f44336;
}

.btn-delete {
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.3s;
}

.btn-delete:hover {
  background: #cc0000;
}

/* Стили для баланса */
.balance {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #eee;
  text-align: center;
}

.balance h3 {
  font-size: 22px;
  margin: 0;
}

.positive {
  color: #4CAF50;
}

.negative {
  color: #f44336;
}
</style>