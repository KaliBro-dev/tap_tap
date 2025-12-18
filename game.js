const target = document.getElementById("target");
const targetImg = document.getElementById("targetImg");
const bubble = document.getElementById("bubble");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const msg = document.getElementById("msg");
const arena = document.querySelector(".arena");

const IMG_NORMAL = "assets/img1.jpg";
const IMG_HIT    = "assets/img2.jpg";

let score = 0;
let timeLeft = 30;
let timer = null;
let running = false;
let hideTimeout = null;

function rand(min, max) { return Math.random() * (max - min) + min; }

function moveTarget() {
  const rect = arena.getBoundingClientRect();
  const padding = 130; // keeps image inside
  const x = rand(padding, rect.width - padding);
  const y = rand(padding, rect.height - padding);
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

function setMessage(text) { msg.textContent = text || ""; }

function resetGame() {
  score = 0;
  timeLeft = 30;
  running = false;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  targetImg.src = IMG_NORMAL;
  target.classList.remove("pop");
  setMessage("Press Start ✅");
  startBtn.disabled = false;
  clearInterval(timer);
  timer = null;
  if (hideTimeout) clearTimeout(hideTimeout);
  hideTimeout = null;
  moveTarget();
}

function startGame() {
  if (running) return;
  running = true;
  startBtn.disabled = true;
  setMessage("GO! Tap it 🔥");

  timer = setInterval(() => {
    timeLeft -= 1;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);

  // target keeps moving even if you don't tap
  moveTarget();
}

function endGame() {
  running = false;
  clearInterval(timer);
  timer = null;
  startBtn.disabled = false;
  setMessage(`Time! Final score: ${score} 🎉`);
}

function hit() {
  if (!running) return;

  score += 1;
  scoreEl.textContent = score;

  // fun reaction
  target.classList.add("pop");
  bubble.textContent = ["?!", "!!", "??!", "WAT", "LOL"][Math.floor(Math.random()*5)];
  targetImg.src = IMG_HIT;

  // move immediately so it feels like a “whack”
  moveTarget();

  // restore back
  if (hideTimeout) clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    target.classList.remove("pop");
    targetImg.src = IMG_NORMAL;
  }, 160);
}

startBtn.addEventListener("click", startGame);
target.addEventListener("click", hit);

// For mobile “tap”
target.addEventListener("touchstart", (e) => { e.preventDefault(); hit(); }, { passive: false });

// Init
resetGame();