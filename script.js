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
    
    start.addEventListener("click", () => {
        start.classList.toggle("restart");
        if (start.classList.contains("restart")) {
            start.textContent = "RESET";
        } else if (start.classList.contains("start")) {
            start.textContent = "START";
        }
        tile.forEach(item => item.textContent = "");
        finish = !finish;
    });

    const symbolType = (player, cellId) => {
        const div = document.querySelector(`#${cellId} .tile`);
        div.style.fontSize = "60px";

        const playzone = document.querySelector(".playzone");
        console.log(player);
            
        if (player === "player1" && div.textContent === "" && !finish) {
            div.textContent = "X";
            div.style.color = "black";

            if (strike()) {
                start.classList.toggle("restart");
                start.textContent = "RESTART";
                finish = true;
                assignValue("player2");
                console.log("player1 Wins!");
            } else {
                assignValue("player2");
            }
        } else if (player === "player2" && div.textContent === "" && !finish) {
            div.textContent = "O";
            div.style.color = "red";

            if (strike()) {
                start.classList.toggle("restart");
                start.textContent = "RESTART";
                finish = true;
                assignValue("player1");
                console.log("player2 Wins!");
            } else {
                assignValue("player1");
            }
        }
    };

    const strike = () => {
        // const classA = Array.from(document.querySelectorAll(".board.A .tile"));
        // const classB = Array.from(document.querySelectorAll(".board.B .tile"));
        // const classC = Array.from(document.querySelectorAll(".board.C .tile"));
        // const class1 = Array.from(document.querySelectorAll(".board.num1 .tile"));
        // const class2 = Array.from(document.querySelectorAll(".board.num2 .tile"));
        // const class3 = Array.from(document.querySelectorAll(".board.num3 .tile"));
        // const classDL = Array.from(document.querySelectorAll(".board.diagonalLeft .tile"));
        // const classDR = Array.from(document.querySelectorAll(".board.diagonalRight .tile"));

        const classArray = ["A", "B", "C", "num1", "num2", "num3", "diagonalLeft", "diagonalRight"];
        let value = true;

        for (i=0; i<classArray.length; i++) {
            const classItem = Array.from(document.querySelectorAll(`.board.${classArray[i]} .tile`));
            const classText = classItem[0].textContent;
            const allSame = classItem.every(item => (item.textContent === classText && classText !== ""));
            
            if (allSame) {
                value = false;
                break;
            }
        }

        if (!value) {
            return true;
        } else {
            return false;
        }

        // const classAText = classA[0].textContent;
        // const classBText = classB[0].textContent;
        // const classCText = classC[0].textContent;
        // const class1Text = class1[0].textContent;
        // const class2Text = class2[0].textContent;
        // const class3Text = class3[0].textContent;
        // const classDLText = classDL[0].textContent;
        // const classDRText = classDR[0].textContent;

        // const allSameA = classA.every(item => (item.textContent === classAText && classAText !== ""));
        // const allSameB = classB.every(item => (item.textContent === classBText && classBText !== ""));
        // const allSameC = classC.every(item => (item.textContent === classCText && classCText !== ""));
        // const allSame1 = class1.every(item => (item.textContent === class1Text && class1Text !== ""));
        // const allSame2 = class2.every(item => (item.textContent === class2Text && class2Text !== ""));
        // const allSame3 = class3.every(item => (item.textContent === class3Text && class3Text !== ""));
        // const allSameDL = classDL.every(item => (item.textContent === classDLText && classDLText !== ""));
        // const allSameDR = classDR.every(item => (item.textContent === classDRText && classDRText !== ""));

        // if (allSameA || allSameB || allSameC || allSame1 || allSame2 || allSame3 || allSameDL || allSameDR) {
        //     return true;
        // } else {
        //     return false;
        // }
    };

    return {
        symbolType
    };
})();

function players(name, score, moves) {
    return {
        name,
        score,
        moves,
    };
}

function getName() {
    //
}

function getScore() {
    //
}
function getMoves(cellId) {
    //
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

const player1 = players(`${getName()}`,`${getScore()}`, `${getMoves()}`);
const player2 = players(`${getName()}`,`${getScore()}`, `${getMoves()}`);

assignValue("player1");