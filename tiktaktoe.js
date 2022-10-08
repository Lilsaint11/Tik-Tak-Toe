let boxes = document.querySelectorAll('.box');
boxes = Array.from(boxes);
const reset = document.querySelector("#reset");
const text = document.querySelector("h1")
const spaces = []; 

const player1 = "X";
const player2 = "O";
let currentPlayer;

const boxClicked = (e) =>{
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if(playerWon()){
            text.innerText = `${currentPlayer} won!`;
            return;
        }
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
 };
 
 const playerWon = () => {
     if(spaces[0] === currentPlayer){
         if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
             return true;
         }
         if(spaces[3] === currentPlayer && spaces[6] === currentPlayer){
             return true;
         }
         if(spaces[4] === currentPlayer && spaces[8] === currentPlayer){
            return true;
        }
     }
    if(spaces[8] === currentPlayer){
        if(spaces[5] === currentPlayer && spaces[2] === currentPlayer){
            return true;
        }
        if(spaces[7] === currentPlayer && spaces[6] === currentPlayer){
            return true;
        }
    }

    if(spaces[4] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer){
            return true;
        }
        if(spaces[2] === currentPlayer && spaces[6] === currentPlayer){
            return true;
        }
    }
 }

 const resetAll = () =>{
    spaces.forEach((space, index)=>{
        spaces[index] = null;
    });
    boxes.forEach(box =>{
        box.innerText = "";
    })
    text.innerText = "Tik-Tak-Toe"
    currentPlayer = player1;
 }

 resetAll();

boxes.forEach((box)=>{
    box.addEventListener("click", boxClicked);
});

reset.addEventListener("click",resetAll)
 