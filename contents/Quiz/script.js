// Quiz Questions Data
const quizQuestions = [
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correct: 1
    },
    {
        question: "Which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "bg-color"],
        correct: 2
    },
    {
        question: "How do you select an element with id 'header'?",
        options: [".header", "#header", "*header", "header"],
        correct: 1
    },
    {
        question: "Which CSS property controls text size?",
        options: ["text-size", "font-size", "text-style", "font-style"],
        correct: 1
    },
    {
        question: "What is the correct syntax for making all <p> elements bold?",
        options: ["p {text-size: bold;}", "p {font-weight: bold;}", "<p style='bold'>", "p {text-weight: bold;}"],
        correct: 1
    },
    {
        question: "How do you make each word in a text start with a capital letter?",
        options: ["text-transform: capitalize", "text-transform: uppercase", "text-style: capitalize", "transform: capitalize"],
        correct: 0
    },
    {
        question: "Which property is used to change the font of an element?",
        options: ["font-style", "font-family", "font-weight", "font-type"],
        correct: 1
    },
    {
        question: "What is the default position value in CSS?",
        options: ["relative", "absolute", "static", "fixed"],
        correct: 2
    },
    {
        question: "How do you make a list not display bullet points?",
        options: ["list-style-type: none", "list-type: none", "bullets: none", "list: none"],
        correct: 0
    },
    {
        question: "Which CSS property is used to create space between the element's border and content?",
        options: ["margin", "padding", "spacing", "border-spacing"],
        correct: 1
    },
    {
        question: "What is the correct CSS syntax for making all <h1> elements blue?",
        options: ["h1 {color: blue;}", "<h1 style='color:blue'>", "h1:color=blue", "h1 = blue"],
        correct: 0
    },
    {
        question: "Which property is used to change the left margin of an element?",
        options: ["margin-left", "indent-left", "padding-left", "left-margin"],
        correct: 0
    },
    {
        question: "What does the z-index property control?",
        options: ["Font size", "Element width", "Stack order", "Zoom level"],
        correct: 2
    },
    {
        question: "Which CSS property controls the text color?",
        options: ["text-color", "font-color", "color", "fgcolor"],
        correct: 2
    },
    {
        question: "How do you center a block element horizontally?",
        options: ["text-align: center", "margin: 0 auto", "align: center", "center: true"],
        correct: 1
    },
    {
        question: "Which property is used to add shadow to text?",
        options: ["font-shadow", "text-shadow", "shadow", "text-effect"],
        correct: 1
    },
    {
        question: "What is the purpose of the display property?",
        options: ["To hide elements", "To show elements", "To specify element display behavior", "To create displays"],
        correct: 2
    },
    {
        question: "Which value of display property creates a flexbox container?",
        options: ["flexbox", "flex", "flexible", "box"],
        correct: 1
    },
    {
        question: "How do you create a CSS comment?",
        options: ["// comment", "<!-- comment -->", "/* comment */", "' comment"],
        correct: 2
    },
    {
        question: "Which CSS property is used to make text bold?",
        options: ["font-weight", "text-weight", "font-style", "text-bold"],
        correct: 0
    },
    {
        question: "What does the 'float' property do?",
        options: ["Makes element float in air", "Positions element to left or right", "Creates floating animation", "Makes element transparent"],
        correct: 1
    },
    {
        question: "Which property is used to create rounded corners?",
        options: ["corner-radius", "border-radius", "round-corner", "corner-style"],
        correct: 1
    },
    {
        question: "What is the default value of the position property?",
        options: ["fixed", "relative", "static", "absolute"],
        correct: 2
    },
    {
        question: "How do you select all <p> elements inside a <div>?",
        options: ["div + p", "div > p", "div p", "div.p"],
        correct: 2
    },
    {
        question: "Which property is used to create space between elements?",
        options: ["padding", "margin", "spacing", "gap"],
        correct: 1
    },
    {
        question: "What does CSS Grid use to define rows?",
        options: ["grid-rows", "grid-template-rows", "rows", "template-rows"],
        correct: 1
    },
    {
        question: "How do you apply a transition effect?",
        options: ["animation", "transition", "effect", "transform"],
        correct: 1
    },
    {
        question: "Which pseudo-class represents an element being hovered over?",
        options: [":hover", ":over", ":mouse", ":focus"],
        correct: 0
    },
    {
        question: "What is the correct syntax for a media query?",
        options: ["@media screen (max-width: 600px)", "@media (max-width: 600px)", "media (max-width: 600px)", "@media-query (max-width: 600px)"],
        correct: 1
    },
    {
        question: "Which property controls the speed curve of an animation?",
        options: ["animation-speed", "animation-curve", "animation-timing-function", "animation-ease"],
        correct: 2
    }
];

// Quiz State
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let startTime = 0;
let timerInterval = null;

// DOM Elements
const startScreen = document.getElementById('startScreen');
const quizContent = document.getElementById('quizContent');
const resultsScreen = document.getElementById('resultsScreen');
const reviewScreen = document.getElementById('reviewScreen');
const startBtn = document.getElementById('startBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const retryBtn = document.getElementById('retryBtn');
const reviewBtn = document.getElementById('reviewBtn');
const backToResultsBtn = document.getElementById('backToResultsBtn');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
prevBtn.addEventListener('click', previousQuestion);
nextBtn.addEventListener('click', nextQuestion);
retryBtn.addEventListener('click', retryQuiz);
reviewBtn.addEventListener('click', showReview);
backToResultsBtn.addEventListener('click', backToResults);

// Initialize Quiz
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    startTime = Date.now();
    
    startScreen.style.display = 'none';
    quizContent.style.display = 'block';
    resultsScreen.style.display = 'none';
    reviewScreen.style.display = 'none';
    
    startTimer();
    displayQuestion();
    updateStats();
}

// Timer Function
function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Display Question
function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    
    document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1}`;
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <div class="option-label">${String.fromCharCode(65 + index)}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    updateNavigationButtons();
}

// Select Option
function selectOption(index) {
    userAnswers[currentQuestion] = index;
    
    const options = document.querySelectorAll('.option');
    options.forEach((opt, idx) => {
        opt.classList.remove('selected');
        if (idx === index) {
            opt.classList.add('selected');
        }
    });
}

// Navigation
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateStats();
    }
}

function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateStats();
    } else {
        finishQuiz();
    }
}

function updateNavigationButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question';
}

// Update Stats
function updateStats() {
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('currentScore').textContent = calculateCurrentScore();
    
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function calculateCurrentScore() {
    let tempScore = 0;
    userAnswers.forEach((answer, index) => {
        if (answer !== null && answer === quizQuestions[index].correct) {
            tempScore++;
        }
    });
    return tempScore;
}

// Finish Quiz
function finishQuiz() {
    stopTimer();
    calculateFinalScore();
    showResults();
}

function calculateFinalScore() {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            score++;
        }
    });
}

// Show Results
function showResults() {
    quizContent.style.display = 'none';
    resultsScreen.style.display = 'block';
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const timeTaken = document.getElementById('timer').textContent;
    
    document.getElementById('finalScore').textContent = `${score}/30`;
    document.getElementById('percentage').textContent = `${percentage}%`;
    document.getElementById('correctAnswers').textContent = score;
    document.getElementById('wrongAnswers').textContent = quizQuestions.length - score;
    document.getElementById('timeTaken').textContent = timeTaken;
    
    // Results Message and Icon
    let message, icon;
    if (percentage >= 90) {
        message = "Outstanding! You're a CSS master! 🌟";
        icon = "🏆";
    } else if (percentage >= 75) {
        message = "Great job! You have excellent CSS knowledge! 👏";
        icon = "🎉";
    } else if (percentage >= 60) {
        message = "Good work! Keep practicing to improve further. 💪";
        icon = "👍";
    } else if (percentage >= 40) {
        message = "Not bad! Review the topics and try again. 📚";
        icon = "📖";
    } else {
        message = "Keep learning! Practice makes perfect. 🌱";
        icon = "💡";
    }
    
    document.getElementById('resultsMessage').textContent = message;
    document.getElementById('resultsIcon').textContent = icon;
    document.getElementById('resultsTitle').textContent = percentage >= 75 ? "Excellent Work!" : "Quiz Completed!";
}

// Show Review
function showReview() {
    resultsScreen.style.display = 'none';
    reviewScreen.style.display = 'block';
    
    const reviewContent = document.getElementById('reviewContent');
    reviewContent.innerHTML = '';
    
    quizQuestions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correct;
        const reviewQuestion = document.createElement('div');
        reviewQuestion.className = `review-question ${isCorrect ? 'correct' : 'incorrect'}`;
        
        reviewQuestion.innerHTML = `
            <div class="review-question-header">
                <div class="review-question-number">Question ${index + 1}</div>
                <div class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
                    ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </div>
            </div>
            <div class="review-question-text">${question.question}</div>
            <div class="review-answer user">
                <strong>Your Answer:</strong> ${userAnswers[index] !== null ? question.options[userAnswers[index]] : 'Not answered'}
            </div>
            ${!isCorrect ? `
                <div class="review-answer correct-answer">
                    <strong>Correct Answer:</strong> ${question.options[question.correct]}
                </div>
            ` : ''}
        `;
        
        reviewContent.appendChild(reviewQuestion);
    });
}

function backToResults() {
    reviewScreen.style.display = 'none';
    resultsScreen.style.display = 'block';
}

// Retry Quiz
function retryQuiz() {
    resultsScreen.style.display = 'none';
    reviewScreen.style.display = 'none';
    startScreen.style.display = 'block';
    stopTimer();
    document.getElementById('timer').textContent = '00:00';
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    startScreen.style.display = 'block';
    quizContent.style.display = 'none';
    resultsScreen.style.display = 'none';
    reviewScreen.style.display = 'none';
});