console.log('Hello, nothing to see here move along')

//hur spelet ska se ut
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Snake
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Speed
let speed = 7;


// storleken på spelet
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

// storleken på Snaken
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

// Första äpplet
let appleX = 5;
let appleY = 5;

//röra sig
let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

//Score
let score = 0;

//game loop
function drawGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();

  if (score > 5) {
    speed = 9;
  }
  if (score > 10) {
    speed = 11;
  }

  setTimeout(drawGame, 1000 / speed);
}

//hur man dör 
function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //väggarna
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }
  // om man dör 
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Helvetica";

    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px Helvetica";

      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", "red");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "green");
      ctx.fillStyle = gradient;

      ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

//score skriva ut
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "15px Helvetica"
  ctx.fillText("Score " + score, canvas.width - 60, 20);
}

// uppdateringen av skärmen
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Snake
function drawSnake() {
  //Kroppen 
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }
  //huvudet 
  ctx.fillStyle = "blue";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

// snake position
function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

//rita äpplet
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

//äter äpplet
function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

// Styrandet 
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  // -y
  if (event.keyCode == 38 || event.keyCode == 87) {
    // 84 är w
    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  // +y
  if (event.keyCode == 40 || event.keyCode == 83) {
    // 83 är s
    if (inputsYVelocity == -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  // -x
  if (event.keyCode == 37 || event.keyCode == 65) {
    // 65 är a
    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  // +x
  if (event.keyCode == 39 || event.keyCode == 68) {
    //68 är d
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
  // "r" för att starta om 
  if (event.keyCode == 82) {
    //r = 82
    onclick = window.location.reload();
  }
}

drawGame();