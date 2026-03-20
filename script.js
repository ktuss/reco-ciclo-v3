const player = document.getElementById('player');
const cansContainer = document.getElementById('cans-container');
const scoreText = document.getElementById('score');
const message = document.getElementById('message');

let score = 0;
let cans = [];
let gameSpeed = 2; // velocidad de las latas hacia el jugador

// Crear lata
function createCan() {
  const can = document.createElement('div');
  can.classList.add('can');
  can.style.right = '0px';
  can.style.bottom = '0px';
  cansContainer.appendChild(can);
  cans.push(can);
}

// Mover latas
function moveCans() {
  cans.forEach((can, index) => {
    let right = parseInt(can.style.right);
    right += gameSpeed;
    can.style.right = right + 'px';

    // colisión simple
    const playerRect = player.getBoundingClientRect();
    const canRect = can.getBoundingClientRect();
    if (
      playerRect.right > canRect.left &&
      playerRect.left < canRect.right
    ) {
      score++;
      scoreText.innerText = `Latas: ${score}`;
      can.remove();
      cans.splice(index, 1);

      if (score >= 30) {
        message.innerText = "¡Eres un buen reciclador!";
        score = 0;
        setTimeout(() => { message.innerText = ''; }, 2000);
      }
    }

    // si sale de pantalla
    if (right > window.innerWidth) {
      can.remove();
      cans.splice(index, 1);
    }
  });
}

// Loop principal
function gameLoop() {
  moveCans();
  requestAnimationFrame(gameLoop);
}

// Generar latas aleatorias cada 2-3 segundos
setInterval(createCan, 2000 + Math.random() * 1000);

gameLoop();
