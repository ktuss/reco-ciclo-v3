const player = document.getElementById("player");
const can = document.getElementById("can");
const jumpBtn = document.getElementById("jumpBtn");
const collectBtn = document.getElementById("collectBtn");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");

let jumping = false;
let gameStarted = false;
let score = 0;

/* Conteo inicial */
function startCountdown() {
  let count = 3;
  message.innerText = count;

  let interval = setInterval(() => {
    count--;
    if (count > 0) {
      message.innerText = count;
    } else if (count === 0) {
      message.innerText = "¡YA!";
    } else {
      clearInterval(interval);
      message.innerText = "";
      gameStarted = true;
    }
  }, 1000);
}

startCountdown();

/* Salto */
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

/* Recolectar lata/botella */
collectBtn.addEventListener("click", () => {
  if (!gameStarted) return;

  let playerRect = player.getBoundingClientRect();
  let canRect = can.getBoundingClientRect();

  if (playerRect.right > canRect.left && playerRect.left < canRect.right) {
    score++;
    scoreText.innerText = "Latas: " + score;

    // Reaparece la lata en otro lugar
    can.style.right = Math.random() * 300 + "px";

    // Mensaje al recolectar 30 latas
    if (score >= 30) {
      message.innerText = "¡Eres un buen reciclador!";
      score = 0; // reinicia contador
      scoreText.innerText = "Latas: 0";
    }
  }
});
