const target = document.getElementById("target");
const targetImg = document.getElementById("targetImg");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const msg = document.getElementById("msg");
const arena = document.querySelector(".arena");

const IMG_NORMAL = "img1.jpg";
const IMG_HIT = "img2.jpg";

let score = 0;
let timeLeft = 30;
let timer = null;
let running = false;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function moveTarget() {
  const r = arena.getBoundingClientRect();
  target.style.left = rand(100, r.width - 100) + "px";
  target.style.top  = rand(100, r.height - 100) + "px";
}

startBtn.onclick = () => {
  if (running) return;
  running = true;
  startBtn.disabled = true;
  msg.textContent = "GO!";
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      running = false;
      startBtn.disabled = false;
      msg.textContent = `Game Over! Score: ${score}`;
    }
  }, 1000);
};

target.onclick = () => {
  if (!running) return;
  score++;
  scoreEl.textContent = score;
  targetImg.src = IMG_HIT;
  moveTarget();
  setTimeout(() => targetImg.src = IMG_NORMAL, 150);
};

moveTarget();
