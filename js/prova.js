
class Quiz {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 15;
        this.answers = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showQuestion(1);
        this.updateProgressBar();
    }

    setupEventListeners() {
        document.getElementById('btn-next').addEventListener('click', () => this.nextQuestion());
        document.getElementById('btn-previous').addEventListener('click', () => this.previousQuestion());
        document.getElementById('btn-submit').addEventListener('click', () => this.submitQuiz());

        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const questionNumber = parseInt(e.target.name.replace('q', ''));
                this.answers[questionNumber] = e.target.value;
                this.updateNavigationButtons();
            });
        });
    }

    showQuestion(number) {
        const allQuestions = document.querySelectorAll('.question-card');
        allQuestions.forEach(q => q.classList.remove('active'));

        const currentCard = document.querySelector(`[data-question="${number}"]`);
        if (currentCard) {
            currentCard.classList.add('active');
        }

        document.getElementById('current-question').textContent = number;

        this.updateProgressBar();

        this.updateNavigationButtons();

        window.scrollTo(0, 0);
    }

    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions) {
            this.currentQuestion++;
            this.showQuestion(this.currentQuestion);
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 1) {
            this.currentQuestion--;
            this.showQuestion(this.currentQuestion);
        }
    }

    updateProgressBar() {
        const percentage = (this.currentQuestion / this.totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = percentage + '%';
    }

    updateNavigationButtons() {
        const btnPrevious = document.getElementById('btn-previous');
        const btnNext = document.getElementById('btn-next');
        const btnSubmit = document.getElementById('btn-submit');

        btnPrevious.disabled = this.currentQuestion === 1;

        if (this.currentQuestion === this.totalQuestions) {
            btnNext.style.display = 'none';
            btnSubmit.style.display = 'inline-block';
        } else {
            btnNext.style.display = 'inline-block';
            btnSubmit.style.display = 'none';
        }
    }

    submitQuiz() {
        let allAnswered = true;
        for (let i = 1; i <= this.totalQuestions; i++) {
            if (!this.answers[i]) {
                allAnswered = false;
                break;
            }
        }

        if (!allAnswered) {
            alert('Por favor, responda todas as questões antes de enviar!');
            return;
        }

        this.calculateResults();
    }

    calculateResults() {
        let correctAnswers = 0;
        const results = [];

        const correctAnswersMap = {
            1: 'b',
            2: 'c',
            3: 'b',
            4: 'c',
            5: 'b',
            6: 'b',
            7: 'b',
            8: 'b',
            9: 'c',
            10: 'c',
            11: 'b',
            12: 'b',
            13: 'b',
            14: 'a',
            15: 'c'
        };

        for (let i = 1; i <= this.totalQuestions; i++) {
            const userAnswer = this.answers[i];
            const correctAnswer = correctAnswersMap[i];
            const isCorrect = userAnswer === correctAnswer;

            if (isCorrect) {
                correctAnswers++;
            }

            results.push({
                question: i,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer,
                isCorrect: isCorrect
            });
        }

        this.showResults(correctAnswers, results);
    }

    showResults(correctAnswers, results) {
        const score = correctAnswers;
        const percentage = Math.round((correctAnswers / this.totalQuestions) * 100);

        document.getElementById('quiz-wrapper').style.display = 'none';

        const resultHTML = `
            <div class="result-screen active">
                <h2>🎬 RESULTADO FINAL 🎬</h2>
                <div class="result-score">${score}/${this.totalQuestions}</div>
                <div class="result-percentage">${percentage}%</div>
                
                <div class="result-details">
                    <p><strong>Status:</strong> ${this.getResultStatus(percentage)}</p>
                    <p><strong>Acertos:</strong> ${score}</p>
                    <p><strong>Erros:</strong> ${this.totalQuestions - score}</p>
                </div>

                <div class="result-message">
                    ${this.getResultMessage(percentage)}
                </div>

                <button class="btn btn-restart" onclick="location.reload()">🔄 Refazer Prova</button>
                <button class="btn" onclick="window.history.back()">← Voltar</button>
            </div>
        `;

        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.innerHTML = resultHTML;

        document.querySelector('.buttons-container').style.display = 'none';
    }

    getResultStatus(percentage) {
        if (percentage >= 90) return '✅ Excelente!';
        if (percentage >= 80) return '✅ Muito Bom!';
        if (percentage >= 70) return '✅ Bom!';
        if (percentage >= 60) return '⚠️ Satisfatório';
        return '❌ Insuficiente';
    }

    getResultMessage(percentage) {
        if (percentage === 100) {
            return '<p>Parabéns! Você é um verdadeiro fã de Dead by Daylight! 🎉</p>';
        } else if (percentage >= 90) {
            return '<p>Excelente desempenho! Você conhece muito sobre Dead by Daylight! 🌟</p>';
        } else if (percentage >= 80) {
            return '<p>Muito bom! Você tem um grande conhecimento do jogo! 👏</p>';
        } else if (percentage >= 70) {
            return '<p>Bom trabalho! Continue estudando sobre o universo de Dead by Daylight! 📚</p>';
        } else if (percentage >= 60) {
            return '<p>Você acertou algumas questões. Revise os conceitos do jogo! 💪</p>';
        } else {
            return '<p>Estude mais sobre Dead by Daylight e tente novamente! 📖</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
});