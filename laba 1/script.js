// Размер игрового поля
const boardSize = 10;
const gameBoard = document.getElementById('game-board');
const cells = [];

// Состояние игры
let snake = [{ x: 0, y: 0 }];
let food = { x: 5, y: 5 };
let direction = 'right';
let speed = 800;
let gameInterval;

// Создание игрового поля
function initializeGameBoard() {
    gameBoard.innerHTML = '';
    cells.length = 0;
    
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cells.push(cell);
            gameBoard.appendChild(cell);
        }
    }
}

// Отрисовка игры
function render() {
    cells.forEach((cell) => cell.classList.remove('snake', 'food'));
    
    snake.forEach((segment) => {
        const index = segment.x + segment.y * boardSize;
        if (cells[index]) cells[index].classList.add('snake');
    });
    
    const foodIndex = food.x + food.y * boardSize;
    if (cells[foodIndex]) cells[foodIndex].classList.add('food');
}

// Обновление игры
function update() {
    const head = { ...snake[0] };
    
    switch (direction) {
        case 'up': head.y -= 1; break;
        case 'down': head.y += 1; break;
        case 'left': head.x -= 1; break;
        case 'right': head.x += 1; break;
    }
    
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        resetGame();
        return false;
    }
    
    if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
        return false;
    }
    
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        generateFood();
    } else {
        snake.pop();
        snake.unshift(head);
    }
    
    return true;
}

// Генерация еды
function generateFood() {
    let newFood;
    let isOnSnake;
    
    do {
        newFood = {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize),
        };
        isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    } while (isOnSnake);
    
    food = newFood;
}

// Сброс игры
function resetGame() {
    snake = [{ x: 0, y: 0 }];
    direction = 'right';
    generateFood();
    updateScoreDisplay();
    render();
}

// Обновление счета
function updateScoreDisplay() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) {
        scoreElement.textContent = snake.length;
    }
}

// Игровой цикл
function gameLoop() {
    update();
    render();
    updateScoreDisplay();
}

// Запуск интервала
function startGameInterval() {
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(gameLoop, speed);
}

// ===== ЗАПУСК =====
initializeGameBoard();
generateFood();
render();
updateScoreDisplay();
startGameInterval();

// ===== ЗАДАНИЕ 1: Клавиши стрелок =====
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
        event.preventDefault();
    }
    
    switch (key) {
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'r':
        case 'R':
            resetGame();
            break;
    }
});

// ===== ЗАДАНИЕ 2: Кнопки джойстика =====
document.getElementById('btn-left').addEventListener('click', () => {
    if (direction !== 'right') direction = 'left';
});

document.getElementById('btn-right').addEventListener('click', () => {
    if (direction !== 'left') direction = 'right';
});

document.getElementById('btn-up').addEventListener('click', () => {
    if (direction !== 'down') direction = 'up';
});

document.getElementById('btn-down').addEventListener('click', () => {
    if (direction !== 'up') direction = 'down';
});

// ===== ЗАДАНИЕ 5: Изменение скорости =====
const speedInput = document.getElementById('speed-input');
const speedInfo = document.querySelector('.speed-info');

speedInput.addEventListener('change', (event) => {
    const newSpeed = parseInt(event.target.value, 10);
    if (!isNaN(newSpeed) && newSpeed >= 100 && newSpeed <= 1000) {
        speed = newSpeed;
        speedInfo.textContent = `Текущая скорость: ${speed} мс`;
        startGameInterval();
    } else {
        event.target.value = speed;
    }
});