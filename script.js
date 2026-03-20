const player = document.getElementById("player");
const jumpBtn = document.getElementById("jumpBtn");
const collectBtn = document.getElementById("collectBtn");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const cansContainer = document.getElementById("cansContainer");

let jumping = false;
let score = 0;
const maxScore = 30;
let cans = [];

// Crear latas dinámicamente
function spawnCan() {
  const can = document.createElement("div");
  can.classList.add("can");
  can.style.left = Math.random() * 80 + 20 + "%";
  cansContainer.appendChild(can);
  cans.push(can);
}

// Animación salto
jumpBtn.addEventListener("click", () => {
  if (jumping) return;
  jumping = true;
  let pos = 0;
  const up = setInterval(() => {
    if (pos >= 120) {
      clearInterval(up);
      const down = setInterval(() => {
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
});

// Recoger lata
collectBtn.addEventListener("click", () => {
  cans.forEach((can, index) => {
    const playerRect = player.getBoundingClientRect();
    const canRect = can.getBoundingClientRect();

    if (
      playerRect.right > canRect.left &&
      playerRect.left < canRect.right &&
      playerRect.bottom > canRect.top
    ) {
      // Incrementar score
      score++;
      scoreText.innerText = "Latas: " + score;

      // Remover lata
      can.remove();
      cans.splice(index, 1);

      // Spawnear otra lata
      setTimeout(spawnCan, 500);

      // Logro
      if (score >= maxScore) {
        message.innerText = "¡Eres un buen reciclador!";
        message.style.display = "block";

        setTimeout(() => {
          score = 0;
          scoreText.innerText = "Latas: 0";
          message.style.display = "none";
        }, 3000);
      }
    }
  });
});

// Inicializar latas
for (let i = 0; i < 5; i++) spawnCan();
