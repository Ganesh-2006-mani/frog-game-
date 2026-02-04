const frog = document.getElementById("frog");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const game = document.getElementById("game");

let y = 0;
let velocity = 0;
let gravity = 1;
let jumping = false;
let score = 0;

/* Jump controls */
document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});

game.addEventListener("click", jump);

/* Jump physics */
function jump() {
  if (jumping) return;
  velocity = 20;
  jumping = true;
}

/* Game loop */
setInterval(() => {
  velocity -= gravity;
  y += velocity;

  if (y <= 0) {
    y = 0;
    jumping = false;
  }

  frog.style.bottom = y + "px";

  // sprite animation
  frog.style.backgroundPosition = `${(Math.floor(Date.now()/100)%4)*33}% 0`;

}, 30);

/* Collision + score */
setInterval(() => {
  let frogRect = frog.getBoundingClientRect();
  let obsRect = obstacle.getBoundingClientRect();

  if (
    frogRect.right > obsRect.left &&
    frogRect.left < obsRect.right &&
    frogRect.bottom > obsRect.top
  ) {
    alert("Game Over! Score: " + score);
    location.reload();
  }

  if (obsRect.right < frogRect.left && !obstacle.passed) {
    score++;
    scoreText.innerText = score;
    obstacle.passed = true;
  }

  if (obsRect.right >= frogRect.left) {
    obstacle.passed = false;
  }

}, 20);
