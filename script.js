const player = document.getElementById("player");
let posX = 0; // posición horizontal
let speed = 2; // velocidad de movimiento

function movePlayer() {
  posX += speed;
  
  // si llega al final de la pantalla, vuelve al inicio
  if (posX > window.innerWidth) {
    posX = -50; // ancho del jugador
  }
  
  player.style.left = posX + "px";
  
  requestAnimationFrame(movePlayer);
}

// iniciar animación
movePlayer();
