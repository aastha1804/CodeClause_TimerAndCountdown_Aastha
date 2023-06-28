let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;

const timerDisplay = document.getElementById('timerDisplay');

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startTimer);

const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', pauseTimer);

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    startButton.removeEventListener('click', startTimer);
    timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    pauseButton.removeEventListener('click', pauseTimer);
    pauseButton.innerHTML = 'Resume';
    pauseButton.addEventListener('click', resumeTimer);

    clearInterval(timerInterval);
}

function resumeTimer() {
    pauseButton.removeEventListener('click', resumeTimer);
    pauseButton.innerHTML = 'Pause';
    pauseButton.addEventListener('click', pauseTimer);

    timerInterval = setInterval(updateTimer, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerDisplay.innerHTML = '00:00:00';

    startButton.innerHTML = 'Start';
    startButton.addEventListener('click', startTimer);
}

function updateTimer() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }

    timerDisplay.innerHTML = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}
