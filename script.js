// Text samples for different difficulty levels
const textSamples = {
    beginner: [
        "the quick brown fox jumps over the lazy dog",
        "a journey of a thousand miles begins with a single step",
        "practice makes perfect when you type every day",
        "learning to type is fun and easy with practice",
        "keep your fingers on the home row keys",
    ],
    intermediate: [
        "The ability to type quickly and accurately is an essential skill in today's digital world. With practice and dedication, anyone can improve their typing speed.",
        "Professional typists understand the importance of proper finger placement and posture. Regular practice sessions help develop muscle memory for faster typing.",
        "Information processing requires both speed and accuracy. Focus on maintaining consistent rhythm while minimizing errors to achieve optimal performance.",
        "Touch typing eliminates the need to look at the keyboard. This skill allows you to concentrate on the content rather than finding individual keys.",
    ],
    advanced: [
        "In the modern workplace, efficient data entry and document processing are crucial components of productivity. Professionals who can type at speeds exceeding 60 words per minute with high accuracy often find themselves at a significant advantage in various career paths.",
        "The evolution of typewriting has transformed from mechanical typewriters to sophisticated computer keyboards. Despite technological changes, the fundamental principles of touch typing remain constant: proper posture, correct finger placement, and consistent practice.",
        "Statistical analysis shows that typing proficiency correlates strongly with overall job performance in information-intensive roles. Organizations increasingly value employees who can process information quickly without sacrificing accuracy or attention to detail.",
    ],
    professional: [
        "Dear Sir/Madam: We acknowledge receipt of your inquiry dated March 15, 2025, regarding our Professional Development Program. Our comprehensive training modules include: (1) Advanced Keyboarding Techniques, (2) Document Formatting Standards, (3) Data Entry Optimization, and (4) Quality Assurance Protocols. The registration fee is $495.00, with a 20% discount for early enrollment.",
        "MEMORANDUM | TO: All Department Heads | FROM: Executive Management | DATE: October 23, 2025 | RE: Implementation of New Information Processing Standards || Effective immediately, all staff members must achieve a minimum typing speed of 50 WPM with 95% accuracy. Training sessions will be conducted bi-weekly. Please ensure your teams are prepared for the upcoming certification examinations scheduled for Q1 2026.",
        "The quarterly report indicates a 23.7% increase in productivity metrics, with processing speeds averaging 78.5 WPM across departments. Cost savings reached $142,500 through automated workflows and improved data entry efficiency. Key performance indicators (KPIs) show that 89% of employees now meet or exceed the established benchmarks for typing proficiency and accuracy rates.",
    ]
};

// Application state
let currentLevel = '';
let currentText = '';
let startTime = null;
let timerInterval = null;
let typedCharacters = 0;
let correctCharacters = 0;
let errors = 0;
let isTestActive = false;

// DOM elements
const lessonSelector = document.getElementById('lessonSelector');
const typingTest = document.getElementById('typingTest');
const results = document.getElementById('results');
const textDisplay = document.getElementById('textDisplay');
const typingInput = document.getElementById('typingInput');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const currentLevelDisplay = document.getElementById('currentLevel');

// Event listeners for lesson selection
document.querySelectorAll('.lesson-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const level = e.currentTarget.dataset.level;
        startLesson(level);
    });
});

// Event listeners for controls
document.getElementById('restartBtn').addEventListener('click', () => {
    startLesson(currentLevel);
});

document.getElementById('changeLessonBtn').addEventListener('click', showLessonSelector);
document.getElementById('tryAgainBtn').addEventListener('click', () => {
    startLesson(currentLevel);
});
document.getElementById('newLessonBtn').addEventListener('click', showLessonSelector);

// Typing input event
typingInput.addEventListener('input', handleTyping);

// Functions
function startLesson(level) {
    currentLevel = level;
    currentText = getRandomText(level);
    
    // Reset state
    startTime = null;
    timerInterval = null;
    typedCharacters = 0;
    correctCharacters = 0;
    errors = 0;
    isTestActive = true;
    
    // Update UI
    lessonSelector.classList.add('hidden');
    typingTest.classList.remove('hidden');
    results.classList.add('hidden');
    
    currentLevelDisplay.textContent = level.charAt(0).toUpperCase() + level.slice(1);
    displayText();
    
    typingInput.value = '';
    typingInput.disabled = false;
    typingInput.focus();
    
    resetStats();
}

function getRandomText(level) {
    const texts = textSamples[level];
    return texts[Math.floor(Math.random() * texts.length)];
}

function displayText() {
    textDisplay.innerHTML = currentText
        .split('')
        .map((char, index) => `<span class="char" data-index="${index}">${char}</span>`)
        .join('');
}

function handleTyping(e) {
    if (!isTestActive) return;
    
    // Start timer on first input
    if (!startTime) {
        startTime = Date.now();
        startTimer();
    }
    
    const inputText = typingInput.value;
    const chars = textDisplay.querySelectorAll('.char');
    
    // Reset all character classes
    chars.forEach(char => {
        char.classList.remove('correct', 'incorrect', 'current');
    });
    
    // Update character states
    typedCharacters = inputText.length;
    correctCharacters = 0;
    errors = 0;
    
    for (let i = 0; i < chars.length; i++) {
        if (i < inputText.length) {
            if (inputText[i] === currentText[i]) {
                chars[i].classList.add('correct');
                correctCharacters++;
            } else {
                chars[i].classList.add('incorrect');
                errors++;
            }
        } else if (i === inputText.length) {
            chars[i].classList.add('current');
        }
    }
    
    // Update stats
    updateStats();
    
    // Check if test is complete
    if (inputText === currentText) {
        completeTest();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const seconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, 100);
}

function updateStats() {
    // Calculate WPM (words per minute)
    if (startTime) {
        const elapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
        const words = correctCharacters / 5; // standard: 5 characters = 1 word
        const wpm = Math.round(words / elapsed) || 0;
        wpmDisplay.textContent = wpm;
    }
    
    // Calculate accuracy
    const accuracy = typedCharacters > 0 
        ? Math.round((correctCharacters / typedCharacters) * 100) 
        : 100;
    accuracyDisplay.textContent = `${accuracy}%`;
}

function resetStats() {
    timerDisplay.textContent = '0:00';
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100%';
}

function completeTest() {
    isTestActive = false;
    clearInterval(timerInterval);
    typingInput.disabled = true;
    
    // Calculate final stats
    const elapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const words = correctCharacters / 5;
    const finalWpm = Math.round(words / elapsed);
    const finalAccuracy = Math.round((correctCharacters / typedCharacters) * 100);
    const timeSeconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;
    
    // Display results
    showResults(finalWpm, finalAccuracy, minutes, seconds);
}

function showResults(wpm, accuracy, minutes, seconds) {
    typingTest.classList.add('hidden');
    results.classList.remove('hidden');
    
    // Update result values
    document.getElementById('finalWpm').textContent = wpm;
    document.getElementById('finalAccuracy').textContent = `${accuracy}%`;
    document.getElementById('finalTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('finalChars').textContent = correctCharacters;
    document.getElementById('finalErrors').textContent = errors;
    document.getElementById('finalLevel').textContent = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);
    
    // Generate performance message
    const message = getPerformanceMessage(wpm, accuracy);
    document.getElementById('performanceMessage').textContent = message;
}

function getPerformanceMessage(wpm, accuracy) {
    let speedMsg = '';
    let accuracyMsg = '';
    
    // Speed assessment
    if (wpm < 20) {
        speedMsg = "Keep practicing! Your speed will improve with regular training.";
    } else if (wpm < 40) {
        speedMsg = "Good progress! You're developing solid typing fundamentals.";
    } else if (wpm < 60) {
        speedMsg = "Excellent work! You're typing at an above-average speed.";
    } else if (wpm < 80) {
        speedMsg = "Outstanding! You've achieved professional-level typing speed.";
    } else {
        speedMsg = "Exceptional! You're typing at an expert level.";
    }
    
    // Accuracy assessment
    if (accuracy < 90) {
        accuracyMsg = " Focus on accuracy to build better muscle memory.";
    } else if (accuracy < 95) {
        accuracyMsg = " Your accuracy is good. Keep refining your technique.";
    } else if (accuracy < 98) {
        accuracyMsg = " Excellent accuracy! You're maintaining great precision.";
    } else {
        accuracyMsg = " Perfect accuracy! Your typing is highly precise.";
    }
    
    return speedMsg + accuracyMsg;
}

function showLessonSelector() {
    lessonSelector.classList.remove('hidden');
    typingTest.classList.add('hidden');
    results.classList.add('hidden');
    
    // Reset state
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    isTestActive = false;
}

// Initialize
showLessonSelector();
