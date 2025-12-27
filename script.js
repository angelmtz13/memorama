const board = document.getElementById('gameBoard');
const movesElement = document.getElementById('moves');
const timerElement = document.getElementById('timer');

const emojis = ['🚀', '🤖', '💻', '🧠', '🌐', '🔒', '📡', '⚡'];
let cards = [...emojis, ...emojis];

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let gameActive = false;
let timerInterval;
let seconds = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    board.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    movesElement.innerText = '0';
    timerElement.innerText = '00:00';
    clearInterval(timerInterval);
    gameActive = true;
    startTimer();

    cards = shuffle(cards);

    cards.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;

        card.innerHTML = `
            <div class="card-face front">?</div>
            <div class="card-face back">${emoji}</div>
        `;

        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (!gameActive || flippedCards.length >= 2 || this.classList.contains('flip')) return;

    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        movesElement.innerText = moves;
        checkForMatch();
    }
}

function checkForMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    if (card1.dataset.emoji === card2.dataset.emoji) {
        flippedCards = [];
        matchedPairs++;
        if (matchedPairs === emojis.length) {
            clearInterval(timerInterval);
            setTimeout(() => alert(`¡Ganaste en ${moves} movimientos!`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        timerElement.innerText = `${mins}:${secs}`;
    }, 1000);
}

function restartGame() {
    startGame();
}

startGame();