let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

function timeToString(time) {
    let diffInHrs = time / (1000 * 60 * 60);
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    return (
        (hh < 10 ? "0" + hh : hh) + ":" +
        (mm < 10 ? "0" + mm : mm) + ":" +
        (ss < 10 ? "0" + ss : ss) + "." +
        (ms < 100 ? (ms < 10 ? "00" + ms : "0" + ms) : ms)
    );
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function printTime() {
            elapsedTime = Date.now() - startTime;
            print(timeToString(elapsedTime));
        }, 10);
        isRunning = true;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00.000");
    elapsedTime = 0;
    isRunning = false;
    lapList.innerHTML = "";
}

function lap() {
    if (isRunning) {
        const li = document.createElement('li');
        li.textContent = timeToString(elapsedTime);
        lapList.appendChild(li);
        lapList.scrollTop = lapList.scrollHeight; // auto-scroll to latest lap
    }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Initialize display
print("00:00:00.000");
