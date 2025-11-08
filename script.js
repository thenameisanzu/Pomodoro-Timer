let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let resetBtn = document.getElementById("reset");
let breakBtn = document.getElementById("break");
let container = document.querySelector(".container");

let timer;
let timeLeft = 25 * 60; // 25 minutes
let isRunning = false;
let isBreak = false;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;

      if (!isBreak) {
        alert("Work session complete! Time for a 5-minute break ☕");
        startBreak();
      } else {
        alert("Break over! Back to work 💪");
        startWork();
      }
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = isBreak ? 5 * 60 : 25 * 60;
  updateDisplay();
}

function startBreak() {
  clearInterval(timer);
  isBreak = true;
  isRunning = false;
  timeLeft = 5 * 60;
  updateDisplay();

  container.classList.remove("work-mode");
  container.classList.add("break-mode");

  startTimer();
}

function startWork() {
  clearInterval(timer);
  isBreak = false;
  isRunning = false;
  timeLeft = 25 * 60;
  updateDisplay();

  container.classList.remove("break-mode");
  container.classList.add("work-mode");

  startTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
breakBtn.addEventListener("click", startBreak);

updateDisplay();
container.classList.add("work-mode");