// Navecita

// const grid = document.querySelector('.grid');
// const resultsDisplay = document.querySelector('.results');
// let currentShooterIndex = 202;
// let width = 15;
// let direction = 1;
// let invadersId;
// let goingRight = true;
// let aliensRemoved = [];
// let results = 0;

// for (let i = 0; i < 225; i++) {
//   const square = document.createElement('div');
//   grid.appendChild(square);
// }

// const squares = Array.from(document.querySelectorAll('.grid div'));

// const alienInvaders = [
//   0,1,2,3,4,5,6,7,8,9,
//   15,16,17,18,19,20,21,22,23,24,
//   30,31,32,33,34,35,36,37,38,39
// ];

// function draw() {
//   for (let i = 0; i < alienInvaders.length; i++) {
//     if(!aliensRemoved.includes(i)) {
//       squares[alienInvaders[i]].classList.add('invader');
//     }
//   }
// }

// draw();

// function remove() {
//   for (let i = 0; i < alienInvaders.length; i++) {
//     squares[alienInvaders[i]].classList.remove('invader');
//   }
// }

// squares[currentShooterIndex].classList.add('shooter');


// function moveShooter(e) {
//   squares[currentShooterIndex].classList.remove('shooter');
//   switch(e.key) {
//     case 'ArrowLeft':
//       if (currentShooterIndex % width !== 0) currentShooterIndex -=1;
//       break;
//     case 'ArrowRight' :
//       if (currentShooterIndex % width < width -1) currentShooterIndex +=1
//       break;
//   }
//   squares[currentShooterIndex].classList.add('shooter');
// }
// document.addEventListener('keydown', moveShooter);

// function moveInvaders() {
//   const leftEdge = alienInvaders[0] % width === 0;
//   const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1;
//   remove();

//   if (rightEdge && goingRight) {
//     for (let i = 0; i < alienInvaders.length; i++) {
//       alienInvaders[i] += width +1;
//       direction = -1;
//       goingRight = false;
//     }
//   }

//   if(leftEdge && !goingRight) {
//     for (let i = 0; i < alienInvaders.length; i++) {
//       alienInvaders[i] += width -1;
//       direction = 1;
//       goingRight = true;
//     }
//   }

//   for (let i = 0; i < alienInvaders.length; i++) {
//     alienInvaders[i] += direction;
//   }

//   draw();

//   if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
//     resultsDisplay.innerHTML = 'GAME OVER';
//     clearInterval(invadersId);
//   }

//   for (let i = 0; i < alienInvaders.length; i++) {
//     if(alienInvaders[i] > (squares.length)) {
//       resultsDisplay.innerHTML = 'GAME OVER';
//       clearInterval(invadersId);
//     }
//   }
//   if (aliensRemoved.length === alienInvaders.length) {
//     resultsDisplay.innerHTML = 'YOU WIN';
//     clearInterval(invadersId);
//   }
// }
// invadersId = setInterval(moveInvaders, 200);

// function shoot(e) {
//   let laserId;
//   let currentLaserIndex = currentShooterIndex;
//   function moveLaser() {
//     squares[currentLaserIndex].classList.remove('laser');
//     currentLaserIndex -= width;
//     squares[currentLaserIndex].classList.add('laser');

//     if (squares[currentLaserIndex].classList.contains('invader')) {
//       squares[currentLaserIndex].classList.remove('laser');
//       squares[currentLaserIndex].classList.remove('invader')
//       squares[currentLaserIndex].classList.add('boom');

//       setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300);
//       clearInterval(laserId);

//       const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
//       aliensRemoved.push(alienRemoved);
//       results++;
//       resultsDisplay.innerHTML = results;
//       console.log(aliensRemoved);

//     }

//   }
//   switch(e.key) {
//     case 'ArrowUp':
//       laserId = setInterval(moveLaser, 50);
//   }
// }

// document.addEventListener('keydown', shoot);




// Snake 
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 6, snakeY = 6;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;


let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;
}

const handleGameOver = () => {

    clearInterval(setIntervalId);
    alert("Game Over, presiona otra vez");
    location.reload();
}

const changeDirection = e => {

    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++; 
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
 
    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {

        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    } 
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);