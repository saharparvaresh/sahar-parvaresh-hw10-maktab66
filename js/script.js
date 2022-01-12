"use strict";


let currentValue = "X";
let totalTile = document.querySelectorAll(".tile");
let winArr = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let playerArr = [[],[]];
let winBGArr = [];
let endGame = false;


const changeValue = ()=>{
    totalTile.forEach((tile) => {
        tile.addEventListener("click", () => {
            if (tile.className.match("fill") == null && !endGame) {
                roundPlayer(tile);
                if (currentValue == "X") {
                    currentValue = "O";
                } else {
                    currentValue = "X";
                }
            }
        })
    });
}
changeValue(); 


const roundPlayer = (tile)=>{
    if (currentValue == "X") {
        playerArr[0].push(parseInt(tile.getAttribute("data-cell")));
        tile.classList.add("fill-x");
    } else {
        playerArr[1].push(parseInt(tile.getAttribute("data-cell")));
        tile.classList.add("fill-o");
    }
    winPlayer(tile,currentValue);
}


const winPlayer = (tile,currentValue)=>{
    let resultWin = false;
    let resultDraw = false;
    for (let i = 0; i <= winArr.length - 1; i++) {
        let win = winArr[i];
        let memberA = win[0];
        let memberB = win[1];
        let memberC = win[2];
        if (
            playerArr[0].includes(memberA) && playerArr[0].includes(memberB) && playerArr[0].includes(memberC)
            || playerArr[1].includes(memberA) && playerArr[1].includes(memberB) && playerArr[1].includes(memberC)
        ) {
            winBGArr = win;
            resultWin = true;
            break;
        }
        else if (playerArr[0].length + playerArr[1].length == totalTile.length) {
            resultDraw = true;
        }
    }
    if (resultWin && !endGame) {
        for (const ItemBG of winBGArr) {
            totalTile[ItemBG].classList.add("wintile");
        }
        if (currentValue === "X") {
            document.querySelector(".board").classList.add("game-over","win-x");
        } else {
            document.querySelector(".board").classList.add("game-over", "win-o");
        }
        restartGame();
        endGame = true;
        return false;
    }
    else if (resultDraw && !endGame) {
        document.querySelector(".board").classList.add("game-over", "draw");
        restartGame();
        endGame = true;
    }
}

const restartGame = () => {
    setTimeout(() => {
        document.body.addEventListener("click", () => {
            window.location.reload();
        })
    }, 500);
}
