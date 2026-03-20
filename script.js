const player = document.getElementById("player");
const can = document.getElementById("can");
const jumpBtn = document.getElementById("jumpBtn");
const collectBtn = document.getElementById("collectBtn");
const countdown = document.getElementById("countdown");
const scoreText = document.getElementById("score");

let jumping = false;
let gameStarted = false;
let score = 0;

/* 🎬 CONTEO */
function startCountdown() {
  let count = 3;
  countdown.innerText = count;

  let interval = setInterval(() => {
    count--;

    if (count > 0) {
      countdown.innerText = count;
    } else if (count === 0) {
      countdown.innerText = "¡YA!";
    } else {
      clearInterval(interval);
      countdown.innerText = "";
      gameStarted = true;
    }
  }, 1000);
}

startCountdown();

/* 🟦 SALTO */
jumpBtn.addEventListener("click", () => {
  if (!jumping && gameStarted) {
    jumping = true;

    let pos = 0;

    let up = setInterval(() => {
      if (pos >= 120) {
        clearInterval(up);

        let down = setInterval(() => {
          if (pos <= 0) {
            clearInterval(down);
            jumping = false;
          } else {
            pos -= 6;
            player.style.bottom = pos + "px";
          }
        }, 20);

      } else {
        pos += 6;
        player.style.bottom = pos + "px";
      }
    }, 20);
  }
});

/* 🟥 RECOGER (instantáneo) */
collectBtn.addEventListener("click", () => {
  if (!gameStarted) return;

  let playerRect = player.getBoundingClientRect();
  let canRect = can.getBoundingClientRect();

  if (
    playerRect.right > canRect.left &&
    playerRect.left < canRect.right
  ) {
    score++;
    scoreText.innerText = "Latas: " + score;

    // reaparece
    can.style.right = Math.random() * 300 + "px";
  }
});
