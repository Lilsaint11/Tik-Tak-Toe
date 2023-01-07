let boxes = document.querySelectorAll('.box');
boxes = Array.from(boxes);
const reset = document.querySelectorAll("#reset");
const text = document.querySelector(".winner");
const spaces = [];
const gameInstructions = document.querySelector(".instructions");
const playerLetters = document.querySelectorAll(".letter");
const winnerBanner = document.querySelector(".winner-banner");
const board = document.querySelector(".board");
const header = document.querySelector(".header");
const closeWinnerBanner = document.querySelector(".close-winner-banner");
const mainReset = document.querySelector(".main-reset");
const playersTurn = document.querySelector(".players-turn");
let playerOneScore = document.querySelector(".p1-score");
let playerTwoScore = document.querySelector(".p2-score");
let drawScore = document.querySelector(".draw-score");
playerOneScore.textContent = 0;
playerTwoScore.textContent = 0;
drawScore.textContent = 0;
let friend = document.querySelector(".friend");
let computer = document.querySelector(".computer");
let letterX = document.querySelector(".x");
let letterO = document.querySelector(".o");
let play = document.querySelector(".play");
const player1 = "X";
const player2 = "O";
let currentPlayer;


const boxClicked = (e) => {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        e.target.classList.add("clicked");
        /* if(playerWon()){
             text.innerText = `${currentPlayer} won!`;
             winnerBanner.style.display = "flex";
             winnerBanner.classList.add("active");
             boxes.forEach((box)=>{
                 box.removeEventListener("click", boxClicked);
             });
            
 
             if(currentPlayer == "X"){
                 playerOneScore.textContent = Number(playerOneScore.textContent) + 1;
             }
 
             
             else if(currentPlayer == "O"){
                 playerTwoScore.textContent = Number(playerTwoScore.textContent) + 1;
             }
            
             return;
         }*/

        if (draw()) {
            text.innerText = "Draw";
            winnerBanner.style.display = "flex";
            winnerBanner.classList.add("active");
            drawScore.textContent = Number(drawScore.textContent) + 1;
            boxes.forEach((box) => {
                box.removeEventListener("click", boxClicked);
            });
            return;
        }
        currentPlayer = currentPlayer === player1 ? player2 : player1;

        // To play with the basic AI
        if (computer.classList.contains("active")) {
            let emptyBoxes = [];
            for (i = 0; i < boxes.length; i++) {
                if (boxes[i].innerHTML == "") {
                    emptyBoxes.push(i)
                }
            }
            playersTurn.style.opacity = "0";
            setTimeout(() => {
                playersTurn.style.opacity = "1";
                playersTurn.innerText = `${currentPlayer}'s Turn`;
            }, 200)
            boxes.forEach((box) => {
                box.removeEventListener("click", boxClicked);
            });

            let Ai = Math.floor(Math.random() * emptyBoxes.length);
            if (emptyBoxes.length > 0) {
                setTimeout(() => {
                    boxes.forEach((box) => {
                        box.addEventListener("click", boxClicked);
                    });
                    boxes[emptyBoxes[Ai]].innerHTML = currentPlayer;
                    boxes[emptyBoxes[Ai]].classList.add("clicked");
                    spaces[emptyBoxes[Ai]] = currentPlayer;

                    if (playerWon()) {
                        text.innerText = `${currentPlayer} won!`;
                        winnerBanner.style.display = "flex";
                        winnerBanner.classList.add("active");
                        boxes.forEach((box) => {
                            box.removeEventListener("click", boxClicked);
                        });


                        if (currentPlayer == "X") {
                            playerOneScore.textContent = Number(playerOneScore.textContent) + 1;
                        }


                        else if (currentPlayer == "O") {
                            playerTwoScore.textContent = Number(playerTwoScore.textContent) + 1;
                        }

                        return;
                    }
                }, 1000)
            }

            setTimeout(() => {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                playersTurn.style.opacity = "0";
                setTimeout(() => {
                    playersTurn.style.opacity = "1";
                    playersTurn.innerText = `${currentPlayer}'s Turn`;
                }, 200)
            }, 1000)
        }
        //smart ai starts
        let currentBoardState = [];
        for (i = 0; i < boxes.length; i++) {
            currentBoardState.push(boxes[i].innerHTML)
        }

        let emptyBoxes = [];
        for (i = 0; i < boxes.length; i++) {
            if (boxes[i].innerHTML == "") {
                emptyBoxes.push(i)
            }
        }

        //winning parameters for the recursive function 'minimax'
        const playerHasWon = () => {
            let winner = null;
            if (spaces[0] == "X" && spaces[1] == "X" && spaces[2] == "X" || spaces[0] == "O" && spaces[1] == "O" && spaces[2] == "O") {
                winner = spaces[0];
            }
            if (spaces[0] == "X" && spaces[3] == "X" && spaces[6] == "X" || spaces[0] == "O" && spaces[3] == "O" && spaces[6] == "O") {
                winner = spaces[0];
            }
            if (spaces[0] == "X" && spaces[4] == "X" && spaces[8] == "X" || spaces[0] == "O" && spaces[4] == "O" && spaces[8] == "O") {
                winner = spaces[0];
            }

            if (spaces[8] == "X" && spaces[5] == "X" && spaces[2] == "X" || spaces[8] == "O" && spaces[5] == "O" && spaces[2] == "O") {
                winner = spaces[8];
            }
            if (spaces[8] == "X" && spaces[7] == "X" && spaces[6] == "X" || spaces[8] == "O" && spaces[7] == "O" && spaces[6] == "O") {
                winner = spaces[8];
            }

            if (spaces[4] == "X" && spaces[1] == "X" && spaces[7] == "X" || spaces[4] == "O" && spaces[1] == "O" && spaces[7] == "O") {
                winner = spaces[4];
            }
            if (spaces[4] == "X" && spaces[3] == "X" && spaces[5] == "X" || spaces[4] == "O" && spaces[3] == "O" && spaces[5] == "O") {
                winner = spaces[4];
            }
            if (spaces[4] == "X" && spaces[2] == "X" && spaces[6] == "X" || spaces[4] == "O" && spaces[2] == "O" && spaces[6] == "O") {
                winner = spaces[4];
            }

            let openSpots = 0;
            for (let i = 0; i < boxes.length; i++) {
                if (boxes[i].innerHTML == '') {
                    openSpots++;
                }
            }

            if (winner == null && openSpots == 0) {
                return 'tie';
            } else {
                return winner;
            }

        }
        //best move for smart AI to play
        function bestMove() {
            let bestScore = -Infinity;
            let move;
            let bestPlay;
            for (let i = 0; i < emptyBoxes.length; i++) {
                boxes[emptyBoxes[i]].innerHTML = currentPlayer;
                spaces[emptyBoxes[i]] = currentPlayer;
                let score = minimax(boxes, 0, false);
                boxes[emptyBoxes[i]].innerHTML = "";
                spaces[emptyBoxes[i]] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                    bestPlay = emptyBoxes[move];
                }
                console.log(bestPlay);

            }
            spaces[bestPlay] = currentPlayer;
            boxes[bestPlay].innerHTML = currentPlayer;
        }
        let scores = {
            X: -10,
            O: 10,
            tie: 0
        };

        bestMove();
        //changing current player back to human after AI plays
        currentPlayer = currentPlayer === player1 ? player2 : player1;

        //minimax recusive function which plays the game behind the scenes to find the route with the best result
        function minimax(boxes, depth, isMaximizing) {
            let result = playerHasWon();
            if (result !== null) {
                return scores[result];
            }


            if (isMaximizing) {
                let bestScore = -Infinity;
                console.log("maximizing");
                for (let i = 0; i < boxes.length; i++) {
                    // Is the spot available?
                    if (boxes[i].innerHTML == "") {
                        boxes[i].innerHTML = player2;
                        spaces[i] = player2;
                        //console.log(i)
                        let score = minimax(boxes, depth + 1, false);
                        console.log(i)
                        boxes[i].innerHTML = "";
                        spaces[i] = "";
                        if (score > bestScore) {
                            bestScore = score;
                        }
                    }
                }
                console.log(bestScore)
                return bestScore;
            } else {
                let bestScore = Infinity;
                console.log("minimizing");
                for (i = 0; i < boxes.length; i++) {
                    // Is the spot available?
                    if (boxes[i].innerHTML == "") {
                        boxes[i].innerHTML = player1;
                        spaces[i] = player1;
                        // console.log(i)
                        let score = minimax(boxes, depth + 1, true);
                        console.log(i)
                        if (score < bestScore) {
                            bestScore = score;
                        }
                        boxes[i].innerHTML = "";
                        spaces[i] = "";

                    }
                }
                console.log(bestScore)
                return bestScore;
            }
        }

        //smart ai stopss    
    }
}


const playerWon = () => {

    if (spaces[0] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            return true;
        }
        if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            return true;
        }

    }
    if (spaces[8] === currentPlayer) {
        if (spaces[5] === currentPlayer && spaces[2] === currentPlayer) {
            return true;
        }
        if (spaces[7] === currentPlayer && spaces[6] === currentPlayer) {
            return true;
        }

    }

    if (spaces[4] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            return true;
        }
        if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
            return true;
        }

    }
}

const draw = () => {
    return [...boxes].every(box => {
        return box.classList.contains("clicked");
    })

}

setTimeout(() => {
    friend.addEventListener("click", () => {
        friend.classList.add("active");
        computer.classList.remove("active");

    })

    computer.addEventListener("click", () => {
        computer.classList.add("active");
        friend.classList.remove("active");
    })

    letterX.addEventListener("click", () => {
        letterX.classList.add("active");
        letterO.classList.remove("active");
    })

    letterO.addEventListener("click", () => {
        letterO.classList.add("active");
        letterX.classList.remove("active");
    })

    play.addEventListener("click", () => {
        gameInstructions.style.display = "none";
        board.style.animation = " spin 2s";
        header.style.animation = " center 4s";
    })
}, 4000)

currentPlayer = "X";
playerLetters.forEach(playerLetter => {
    setTimeout(() => {
        playerLetter.addEventListener("click", () => {
            currentPlayer = playerLetter.innerHTML;
        })
    }, 4000)
})

closeWinnerBanner.addEventListener("click", () => {
    winnerBanner.style.transform = "translateY(-500px)";
    setTimeout(() => {
        winnerBanner.style.display = "none";
        winnerBanner.style.transform = "translateY(0)";
    }, 1000)
    mainReset.classList.add("active")
})

const resetAll = () => {
    boxes.forEach((box) => {
        box.addEventListener("click", boxClicked);
    });
    /*spaces.forEach((space, index)=>{
        spaces[index] = null;
    });
    
    /*boxes.forEach(box =>{
        box.innerText = "";
        box.classList.remove("clicked");
    })*/

    winnerBanner.classList.remove("active");
    winnerBanner.style.display = "none";
    mainReset.classList.remove("active");
}

resetAll();


reset.forEach((resetButton) => {
    resetButton.addEventListener("click", resetAll);
})