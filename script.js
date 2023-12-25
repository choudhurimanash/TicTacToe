// accessing the html nodes
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let mainContain = document.querySelector(".main-hide");

let turnO = true; //playerX, playerY
let count = 0; // to trak draw

// define the winner patter for selecting the winner
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWiner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// function for game draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.\u{1F622}`;
  msgContainer.classList.remove("hide");
  mainContain.classList.add("hide");
  disabledBoxes();
};

// function for check the winner
const checkWiner = () => {
  for (let pattern of winPatterns) { 
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWiner(pos1Val);
      }
    }
  }
};

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// function for show the winner
const showWiner = (winner) => {
  msg.innerText = `\u{1F38A} Congratulations, Winner is ${winner} \u{1F38A}`;
  msgContainer.classList.remove("hide");
  mainContain.classList.add("hide");
  disabledBoxes();
};

// function for reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// event handlers for new and reset button
newGameBtn.addEventListener("click", () => {
  resetGame();
  mainContain.classList.remove("hide");
});

resetBtn.addEventListener("click", resetGame);
