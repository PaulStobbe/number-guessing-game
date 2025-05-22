class NumberGuessingGame {
    constructor() {
        this.secretNumber = this.generateRandomNumber();
        this.attempts = 0;
        this.guessHistory = [];
        this.maxAttempts = 10;
        this.gameOver = false;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        this.guessInput = document.getElementById('guessInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.feedback = document.getElementById('feedback');
        this.attemptsDisplay = document.getElementById('attempts');
        this.guessHistoryDisplay = document.getElementById('guessHistory');
        this.newGameBtn = document.getElementById('newGameBtn');
    }
    
    bindEvents() {
        this.submitBtn.addEventListener('click', () => this.makeGuess());
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.makeGuess();
            }
        });
        this.newGameBtn.addEventListener('click', () => this.startNewGame());
    }
    
    generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }
    
    makeGuess() {
        if (this.gameOver) return;
        
        const guess = parseInt(this.guessInput.value);
        
        if (!this.isValidGuess(guess)) {
            this.showFeedback('Bitte gib eine Zahl zwischen 1 und 100 ein!', 'invalid');
            return;
        }
        
        this.attempts++;
        this.guessHistory.push(guess);
        this.updateStats();
        
        if (guess === this.secretNumber) {
            this.handleCorrectGuess();
        } else if (this.attempts >= this.maxAttempts) {
            this.handleGameOver();
        } else {
            this.handleIncorrectGuess(guess);
        }
        
        this.guessInput.value = '';
        this.guessInput.focus();
    }
    
    isValidGuess(guess) {
        return !isNaN(guess) && guess >= 1 && guess <= 100;
    }
    
    handleCorrectGuess() {
        this.showFeedback(`🎉 Richtig! Die Zahl war ${this.secretNumber}! Du hast ${this.attempts} Versuche gebraucht.`, 'correct');
        this.endGame();
    }
    
    handleGameOver() {
        this.showFeedback(`😞 Spiel vorbei! Die Zahl war ${this.secretNumber}. Du hattest ${this.maxAttempts} Versuche.`, 'game-over');
        this.endGame();
    }
    
    handleIncorrectGuess(guess) {
        const remaining = this.maxAttempts - this.attempts;
        let message = '';
        let className = '';
        
        if (guess < this.secretNumber) {
            message = `📈 Zu niedrig! Noch ${remaining} Versuche.`;
            className = 'too-low';
        } else {
            message = `📉 Zu hoch! Noch ${remaining} Versuche.`;
            className = 'too-high';
        }
        
        this.showFeedback(message, className);
    }
    
    showFeedback(message, className) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${className}`;
    }
    
    updateStats() {
        this.attemptsDisplay.textContent = this.attempts;
        this.guessHistoryDisplay.textContent = this.guessHistory.join(', ');
    }
    
    endGame() {
        this.gameOver = true;
        this.submitBtn.disabled = true;
        this.guessInput.disabled = true;
        this.newGameBtn.style.display = 'inline-block';
    }
    
    startNewGame() {
        this.secretNumber = this.generateRandomNumber();
        this.attempts = 0;
        this.guessHistory = [];
        this.gameOver = false;
        
        this.submitBtn.disabled = false;
        this.guessInput.disabled = false;
        this.guessInput.value = '';
        this.feedback.textContent = '';
        this.feedback.className = 'feedback';
        this.newGameBtn.style.display = 'none';
        
        this.updateStats();
        this.guessInput.focus();
    }
}

// Spiel starten wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', () => {
    new NumberGuessingGame();
});