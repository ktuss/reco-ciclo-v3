const player = document.getElementById("player");
const can = document.getElementById("can");
const bag = document.getElementById("bag");
const jumpBtn = document.getElementById("jumpBtn");
const collectBtn = document.getElementById("collectBtn");
const bagCountDiv = document.getElementById("bagCount");
const messageDiv = document.getElementById("message");

let jumping = false;
let bagCount = 0;
let gameStarted = false;

// Conteo inicial
function startCountdown() {
  let count = 3;
  messageDiv.innerText = count;

  let interval = setInterval(() => {
    count--;
    if (count > 0) {
      messageDiv.innerText = count;
    } else if (count === 0) {
      messageDiv.innerText = "¡Empieza!";
    } else {
      clearInterval(interval);
      messageDiv.innerText = "";
      gameStarted = true;
    }
  }, 1000);
}

startCountdown();

// Saltar
jumpBtn.addEventListener("click", () => {
  if (!jumping && gameStarted) {
    jumping = true;
    let pos = 0;

    let up = setInterval(() => {
      if (pos >= 100) {
        clearInterval(up);
        let down = setInterval(() => {
          if (pos <= 0) {
            clearInterval(down);
            jumping = false;
          } else {
            pos -= 5;
            player.style.bottom = pos + "px";
          }
        }, 20);
      } else {
        pos += 5;
        player.style.bottom = pos + "px";
      }
    }, 20);
  }
});

// Recoger lata
collectBtn.addEventListener("click", () => {
  if (!gameStarted) return;

  const playerRect = player.getBoundingClientRect();
  const canRect = can.getBoundingClientRect();

  if (
    playerRect.right > canRect.left &&
    playerRect.left < canRect.right
  ) {
    can.style.display = "none";

    bagCount++;
    bagCountDiv.innerText = `Latas en bolso: ${bagCount}`;

    // La bolsa crece
    const scale = 1 + bagCount * 0.05;
    bag.style.transform = `scale(${scale})`;

    setTimeout(() => {
      can.style.display = "block";
      can.style.right = Math.random() * 250 + "px";
    }, 1000);

    // Mensaje al llegar a 10 latas
    if (bagCount >= 10) {
      messageDiv.innerText = "¡Buen recolector!";
      setTimeout(() => {
        bagCount = 0;
        bagCountDiv.innerText = `Latas en bolso: ${bagCount}`;
        bag.style.transform = `scale(1)`;
        messageDiv.innerText = "";
      }, 2000);
    }
  }
});
