const board = (function() {
    const Gameboard = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
    const playzone = document.querySelector(".playzone");

    for (i=0; i<Gameboard.length; i++) {
        const div = document.createElement("div");
        const tile = document.createElement("button");
        div.classList.add("board");
        div.id = `${Gameboard[i]}`;
        tile.classList.add("tile");
        playzone.appendChild(div);
        div.appendChild(tile);
    }

    for (i=0; i<3; i++) {
        document.querySelector(`#A${i+1}`).classList.add("A");
        document.querySelector(`#A${i+1}`).classList.add(`num${i+1}`);
    }

    for (i=0; i<3; i++) {
        document.querySelector(`#B${i+1}`).classList.add("B");
        document.querySelector(`#B${i+1}`).classList.add(`num${i+1}`);
    }

    for (i=0; i<3; i++) {
        document.querySelector(`#C${i+1}`).classList.add("C");
        document.querySelector(`#C${i+1}`).classList.add(`num${i+1}`);
    }

    for (i=0; i<Gameboard.length; i=i+4) {
        document.querySelector(`#${Gameboard[i]}`).classList.add("diagonalLeft");
    }

    for (i=2; i<Gameboard.length-1; i=i+2) {
        document.querySelector(`#${Gameboard[i]}`).classList.add("diagonalRight");
    }
})();

const displayController = (function() {
    let finish = true;

    const start = document.querySelector(".button .start");
    const tile = document.querySelectorAll(`.tile`);

    let score1 = 0;
    let score2 = 0;
    let move1 = 0;
    let move2 = 0;
            
    start.addEventListener("click", () => {
        start.classList.toggle("restart");

        if (start.classList.contains("restart")) {
            let rand = Math.floor(Math.random()*2);
            if (rand === 0) {
                assignValue("player1");
                document.querySelector(`.player1`).style.boxShadow = "-10px 10px 18px black";
                document.querySelector(`.player2`).style.boxShadow = "none";
                document.querySelector(`.player1`).style.position = "relative";
                document.querySelector(`.player1`).style.bottom = "5px";
                document.querySelector(`.player1`).style.left = "5px";
                document.querySelector(`.player2`).style.position = "relative";
                document.querySelector(`.player2`).style.bottom = "0";
                document.querySelector(`.player2`).style.left = "0";
                document.querySelector(`.player1`).style.transition = "box-shadow 0.2s ease-in-out, bottom 0.2s ease-in-out, left 0.2s ease-in-out";
                document.querySelector(`.player2`).style.transition = "box-shadow 0.2s ease-in-out, bottom 0.2s ease-in-out, left 0.2s ease-in-out";
            } else {
                assignValue("player2");
                document.querySelector(`.player1`).style.boxShadow = "none";
                document.querySelector(`.player2`).style.boxShadow = "-10px 10px 18px black";
                document.querySelector(`.player1`).style.position = "relative";
                document.querySelector(`.player1`).style.bottom = "0";
                document.querySelector(`.player1`).style.left = "0";
                document.querySelector(`.player2`).style.position = "relative";
                document.querySelector(`.player2`).style.bottom = "5px";
                document.querySelector(`.player2`).style.left = "5px";
                document.querySelector(`.player1`).style.transition = "box-shadow 0.2s ease-in-out, bottom 0.2s ease-in-out, left 0.2s ease-in-out";
                document.querySelector(`.player2`).style.transition = "box-shadow 0.2s ease-in-out, bottom 0.2s ease-in-out, left 0.2s ease-in-out";
            }
            start.textContent = "RESET";
            document.querySelector(".display").innerHTML = "";
        } else if (start.classList.contains("start")) {
            start.textContent = "START";
            document.querySelector(`.player1`).style.boxShadow = "none";
            document.querySelector(`.player2`).style.boxShadow = "none";
            document.querySelector(`.player1`).style.position = "relative";
            document.querySelector(`.player1`).style.bottom = "0";
            document.querySelector(`.player1`).style.left = "0";
            document.querySelector(`.player2`).style.position = "relative";
            document.querySelector(`.player2`).style.bottom = "0";
            document.querySelector(`.player2`).style.left = "0";
            document.querySelector(`.player1`).style.transition = "box-shadow 0.2s ease-in-out, bottom 0.2s ease-in-out, left 0.2s ease-in-out";
            document.querySelector(`.player2`).style.transition = "box-shadow 0.2s ease-in-out, bottom 0.2s ease-in-out, left 0.2s ease-in-out";
            document.querySelector(".display").innerHTML = `<span class="display1">START TO PLAY</span>`;
        }

        tile.forEach(item => {
            item.textContent = "";
            item.style.backgroundColor = "white";
            item.style.transition = "background-color 0.2s ease-in-out";

            if (item.classList.contains("greenX")) {
                item.classList.remove("greenX");
            } else if (item.classList.contains("greenO")) {
                item.classList.remove("greenO");
            }
        });

        move1 = 0;
        move2 = 0;
        document.querySelector(`.player1 .playercard .move`).textContent = "MOVES: 0"
        document.querySelector(`.player2 .playercard .move`).textContent = "MOVES: 0"

        finish = !finish;
    });

    const symbolType = (player, cellId) => {
        const div = document.querySelector(`#${cellId} .tile`);
        div.style.fontSize = "60px";

        const playzone = document.querySelector(".playzone");
        console.log(player);

        const playerName =document.querySelector(`.${player} .playercard .name`)
        const playerScore = document.querySelector(`.${player} .playercard .score`);
        const playerMoves = document.querySelector(`.${player} .playercard .move`);

        if (player === "player1" && div.textContent === "" && !finish) {
            div.textContent = "X";
            div.style.color = "black";

            if (strike()) {
                start.classList.toggle("restart");
                start.textContent = "RESTART";
                finish = true;
                console.log("player1 Wins!");
                score1++;
                playerScore.textContent = `SCORE: ${score1}`;
                move1++;
                playerMoves.textContent = `MOVES: ${move1}`;
                document.querySelector(".display").innerHTML = `<span class="display1">${playerName.textContent}</span><span>WINS!</span>`;
            } else {
                assignValue("player2");
                document.querySelector(`.player1`).style.boxShadow = "none";
                document.querySelector(`.player2`).style.boxShadow = "-10px 10px 18px black";
                document.querySelector(`.player1`).style.position = "relative";
                document.querySelector(`.player1`).style.bottom = "0";
                document.querySelector(`.player1`).style.left = "0";
                document.querySelector(`.player2`).style.position = "relative";
                document.querySelector(`.player2`).style.bottom = "5px";
                document.querySelector(`.player2`).style.left = "5px";
                document.querySelector(`.player1`).style.transition = "box-shadow 0.2s ease-in-out, bottom 0.2s ease-in-out, left 0.2s ease-in-out";
                document.querySelector(`.player2`).style.transition = "box-shadow 0.2s ease-in-out, bottom 0.2s ease-in-out, left 0.2s ease-in-out";
                move1++;
                playerMoves.textContent = `MOVES: ${move1}`;
            }
        } else if (player === "player2" && div.textContent === "" && !finish) {
            div.textContent = "O";
            div.style.color = "red";

            if (strike()) {
                start.classList.toggle("restart");
                start.textContent = "RESTART";
                finish = true;
                console.log("player2 Wins!");
                score2++;
                playerScore.textContent = `SCORE: ${score2}`;
                move2++;
                playerMoves.textContent = `MOVES: ${move2}`;
                document.querySelector(".display").innerHTML = `<span class="display2">${playerName.textContent}</span><span>WINS!</span>`;
            } else {
                assignValue("player1");
                document.querySelector(`.player1`).style.boxShadow = "-10px 10px 18px black";
                document.querySelector(`.player2`).style.boxShadow = "none";
                document.querySelector(`.player1`).style.position = "relative";
                document.querySelector(`.player1`).style.bottom = "5px";
                document.querySelector(`.player1`).style.left = "5px";
                document.querySelector(`.player2`).style.position = "relative";
                document.querySelector(`.player2`).style.bottom = "0";
                document.querySelector(`.player2`).style.left = "0";
                document.querySelector(`.player1`).style.transition = "box-shadow 0.2s ease-in-out, bottom 0.2s ease-in-out, left 0.2s ease-in-out";
                document.querySelector(`.player2`).style.transition = "box-shadow 0.2s ease-in-out, bottom 0.2s ease-in-out, left 0.2s ease-in-out";
                move2++;
                playerMoves.textContent = `MOVES: ${move2}`;
            }
        }
    };

    const strike = () => {
        const classArray = ["A", "B", "C", "num1", "num2", "num3", "diagonalLeft", "diagonalRight"];
        let value = true;

        for (i=0; i<classArray.length; i++) {
            const classItem = Array.from(document.querySelectorAll(`.board.${classArray[i]} .tile`));
            const classText = classItem[0].textContent;
            const allSame = classItem.every(item => (item.textContent === classText && classText !== ""));
            
            if (allSame) {
                const classItemValue = classItem;

                classItemValue.forEach(item => {
                    item.style.color = "white";
                    item.style.transition = "color 0.2s ease-in-out";
                    if (item.textContent === "X") {
                        item.classList.add("greenX");
                    } else if (item.textContent === "O") {
                        item.classList.add("greenO");
                    }
                });

                value = false;
                break;
            }
        }

        if (!value) {
            value = true;
            return true;
        } else {
            return false;
        }
    };

    return {
        symbolType
    };
})();

function getName(player) {
    const name = prompt(`${player} name:`);
    const playerName = document.querySelector(`.${player} .playercard .name`);
    playerName.textContent = name.toUpperCase();
}

function assignValue(player) {
    const playzone = document.querySelector(".playzone");
    const children = Array.from(playzone.children);
    for (i=0; i<children.length; i++) {
        const child = document.querySelector(`#${children[i].id} .tile`);
        child.onclick = function () {
            displayController.symbolType(player, `${child.parentElement.id}`);
        };
    }
}

const player1 = getName("player1");
const player2 = getName("player2");