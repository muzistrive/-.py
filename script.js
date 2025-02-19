const gridSize = 8;
const cellTypes = ['🌰', '🍂', '🍁', '🎃']; // 板栗和其他元素
let grid = [];
let score = 0;
let targetScore = 1000;
let timeLeft = 60;
let timer;

// 初始化游戏
function initGame() {
    createGrid();
    updateScore();
    startTimer();
    document.getElementById('close-popup').addEventListener('click', () => {
        document.getElementById('card-popup').classList.add('hidden');
    });
}

// 创建游戏网格
function createGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    grid = [];
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = getRandomCellType();
            cell.addEventListener('click', () => onCellClick(i, j));
            gridElement.appendChild(cell);
            grid[i][j] = cell;
        }
    }
}

// 随机生成板栗类型
function getRandomCellType() {
    return cellTypes[Math.floor(Math.random() * cellTypes.length)];
}

// 点击格子事件
function onCellClick(x, y) {
    const type = grid[x][y].textContent;
    const matches = findMatches(x, y, type);
    if (matches.length >= 3) {
        removeMatches(matches);
        updateScore(matches.length * 10);
        refillGrid();
        checkWin();
    }
}

// 查找相邻相同板栗
function findMatches(x, y, type, matches = []) {
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize || grid[x][y].textContent !== type || matches.includes(`${x},${y}`)) {
        return matches;
    }
    matches.push(`${x},${y}`);
    findMatches(x + 1, y, type, matches);
    findMatches(x - 1, y, type, matches);
    findMatches(x, y + 1, type, matches);
    findMatches(x, y - 1, type, matches);
    return matches;
}

// 消除板栗
function removeMatches(matches) {
    matches.forEach(match => {
        const [x, y] = match.split(',').map(Number);
        grid[x][y].textContent = '';
    });
}

// 更新分数
function updateScore(points = 0) {
    score += points;
    document.getElementById('score').textContent = `分数: ${score}`;
}

// 补充网格
function refillGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j].textContent === '') {
                grid[i][j].textContent = getRandomCellType();
            }
        }
    }
}

// 检查是否通关
function checkWin() {
    if (score >= targetScore) {
        clearInterval(timer);
        showCardPopup();
    }
}

// 显示卡片弹窗
function showCardPopup() {
    const card = getRandomCard();
    document.getElementById('card-title').textContent = card.title;
    document.getElementById('card-description').textContent = card.description;
    document.getElementById('card-popup').classList.remove('hidden');
}

// 随机获取一张卡片
function getRandomCard() {
    const cards = [
        { title: '板栗的历史', description: '板栗在中国已有2000多年的种植历史，是传统的健康食品。' },
        { title: '板栗的文化', description: '板栗在亚洲文化中象征着丰收和幸福。' },
        { title: '板栗的营养', description: '板栗富含维生素C和膳食纤维，有助于增强免疫力。' }
    ];
    return cards[Math.floor(Math.random() * cards.length)];
}

// 计时器
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `时间: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('时间到！游戏结束。');
        }
    }, 1000);
}

// 初始化游戏
initGame();