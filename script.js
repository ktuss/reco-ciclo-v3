const player = document.getElementById("player");
const can = document.getElementById("can");
const jumpBtn = document.getElementById("jumpBtn");
const collectBtn = document.getElementById("collectBtn");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const background = document.getElementById("background");

let jumping = false;
let gameStarted = true;
let score = 0;

/* 🟦 SALTO */
jumpBtn.addEventListener("click", () => {
  if (!jumping) {
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

/* 🟥 RECOGER LATA */
collectBtn.addEventListener("click", () => {
  if (!gameStarted) return;

  let playerRect = player.getBoundingClientRect();
  let canRect = can.getBoundingClientRect();

  if (playerRect.right > canRect.left &&
      playerRect.left < canRect.right) {
    score++;
    scoreText.innerText = "Latas: " + score;

    // mover lata aleatoriamente
    can.style.right = Math.random() * 500 + "px";

    // mover fondo como si avanzara
    let bgLeft = parseInt(background.style.left || 0);
    background.style.left = (bgLeft - 20) + "px";

    // mensaje final a los 30
    if (score >= 30) {
      message.style.display = "block";
      message.innerText = "¡Eres un buen reciclador!";
      setTimeout(() => {
        score = 0;
        scoreText.innerText = "Latas: 0";
        message.style.display = "none";
        background.style.left = "0px";
      }, 3000);
    }
  }
});
