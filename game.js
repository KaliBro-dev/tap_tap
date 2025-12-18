const target = document.getElementById("target");
const targetImg = document.getElementById("targetImg");
const bubble = document.getElementById("bubble");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const msg = document.getElementById("msg");
const arena = document.querySelector(".arena");

const IMG_NORMAL = "./img1.jpg";
const IMG_HIT    = "./img2.jpg";

let score = 0;
let timeLeft = 30;
let timer = null;
let running = false;

let tongueTimer = null;

// ✅ change this to control how long tongue stays
const TONGUE_MS = 800; // try 600, 800, 1000

function rand(min, max) { return Math.random() * (max - min) + min; }

function moveTarget() {
  const rect = arena.getBoundingClientRect();

  // keep the image fully inside arena
  const padX = 120;
  const padY = 120;

  const x = rand(padX, rect.width - padX);
  const y = rand(padY, rect.height - padY);

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

function resetGame() {
  score = 0;
  timeLeft = 30;
  running = false;

  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  targetImg.src = IMG_NORMAL;
  target.classList.remove("pop");
  msg.textContent = "Press Start ✅";

  startBtn.disabled = false;

  clearInterval(timer);
  timer = null;

  if (tongueTimer) clearTimeout(tongueTimer);
  tongueTimer = null;

  moveTarget();
}

function startGame() {
  if (running) return;

  running = true;
  startBtn.disabled = true;
  msg.textContent = "GO! Tap it 🔥";

  timer = setInterval(() => {
    timeLeft -= 1;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  moveTarget();
}

function endGame() {
  running = false;
  clearInterval(timer);
  timer = null;

  startBtn.disabled = false;
  msg.textContent = `Time! Final score: ${score} 🎉`;
}

function hit() {
  if (!running) return;

  score += 1;
  scoreEl.textContent = score;

  // reaction
  target.classList.add("pop");
  bubble.textContent = ["?!", "!!", "??!", "WAT", "LOL"][Math.floor(Math.random() * 5)];

  // show tongue image
  targetImg.src = IMG_HIT;

  // move immediately
  moveTarget();

  // ✅ prevent flicker if tapping fast
  if (tongueTimer) clearTimeout(tongueTimer);

  tongueTimer = setTimeout(() => {
    target.classList.remove("pop");
    targetImg.src = IMG_NORMAL;
  }, TONGUE_MS);
}

startBtn.addEventListener("click", startGame);
target.addEventListener("click", hit);

// mobile tap
target.addEventListener("touchstart", (e) => {
  e.preventDefault();
  hit();
}, { passive: false });

// init
resetGame();
