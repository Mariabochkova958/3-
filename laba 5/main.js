const numberInput = document.getElementById('numberInput');
const categorySelect = document.getElementById('categorySelect');
const searchBtn = document.getElementById('searchBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const factText = document.getElementById('factText');

// По умолчанию выбрана категория trivia
// Индикатор загрузки скрыт изначально

// Функция для получения факта о числе
async function fetchNumberFact(number, type) {
    try {
        // Показываем индикатор загрузки
        loadingIndicator.classList.remove('hidden');
        
        // Меняем текст на загрузку
        factText.textContent = 'Загрузка...';
        
        // Формируем URL для API
        // API: http://numbersapi.com/number/type?json
        const url = `http://numbersapi.com/${number}/${type}?json`;
        
        // Отправляем запрос
        const response = await fetch(url);
        
        // Проверяем, успешен ли ответ
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        
        // Парсим JSON ответ
        const data = await response.json();
        
        // Скрываем индикатор загрузки
        loadingIndicator.classList.add('hidden');
        
        // Проверяем, найден ли факт
        if (data.found) {
            // Если факт найден - показываем его
            factText.textContent = data.text;
        } else {
            // Если факт не найден - показываем сообщение
            // Определяем тип числа (год или обычное число)
            let typeText = '';
            if (type === 'year') {
                typeText = 'скучный год';
            } else {
                typeText = 'скучное число';
            }
            factText.textContent = `${number} - ${typeText}`;
        }
        
        return data;
        
    } catch (error) {
        // Обработка ошибок
        loadingIndicator.classList.add('hidden');
        factText.textContent = 'Произошла ошибка при загрузке. Проверьте подключение к интернету.';
        console.error('Ошибка:', error);
    }
}

// Функция для выполнения поиска
function searchFact() {
    // Получаем значение числа
    let number = numberInput.value.trim();
    
    // Проверяем, что число введено
    if (number === '') {
        factText.textContent = 'Пожалуйста, введите число';
        return;
    }
    
    // Получаем выбранную категорию
    const category = categorySelect.value;
    
    // Для года проверяем, что число в диапазоне 1-9999
    if (category === 'year') {
        const yearNum = parseInt(number);
        if (yearNum < 1 || yearNum > 9999) {
            factText.textContent = 'Пожалуйста, введите год от 1 до 9999';
            return;
        }
    }
    
    // Получаем факт
    fetchNumberFact(number, category);
}

// Обработчик нажатия на кнопку "Поиск"
searchBtn.addEventListener('click', searchFact);

// Обработчик нажатия клавиши Enter в поле ввода
numberInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchFact();
    }
});

//  для кнопок-примеров
const exampleBtns = document.querySelectorAll('.example-btn');
exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const number = btn.getAttribute('data-num');
        numberInput.value = number;
        searchFact();
    });
});


setTimeout(() => {
    searchFact();
}, 100);