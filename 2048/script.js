// 5:12=>7% 
const mySel = (sel) => document.querySelector(sel);
const mySelAll = (sel) => document.querySelectorAll(sel);
const board = mySel('.board');

var score = 0;
//design the game board
let cells = ""
for (let i = 0; i < 16; i++) {
    cells += `<div class="cell" data-n='0'>0</div>`;
}
board.innerHTML = cells;

//generate random number
const generateRandomNumber = (n) => Math.floor(Math.random() * n);

//generate random cell
function generateRandomCell(x = 0) {
    let n = generateRandomNumber(16)
    // let x = 0;
    let randomN = ["2","4","2"]
    if (mySelAll(".cell")[n].innerHTML == "0") {
        mySelAll(".cell")[n].innerHTML = randomN[generateRandomNumber(3)];
        x = 0
    } else {
        ++x;
        if (x == 16) {
            alert("Game Over")
        } else {
            generateRandomCell(x)
        }
    }
}
generateRandomCell()
generateRandomCell()


function leftRight(pos) {
    let allCells = mySelAll(".cell");
    let row = []

    let row0 = []
    let row1 = []
    let row2 = []
    let row3 = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i == 0) {
                row0.push(allCells[j]);
            }
            if (i == 1) {
                row1.push(allCells[j + 4]);
            }
            if (i == 2) {
                row2.push(allCells[j + 8]);
            }
            if (i == 3) {
                row3.push(allCells[j + 12]);
            }
        }
    }
    row.push(row0, row1, row2, row3);

    // console.log(row);

    for (let i = 0; i < 4; i++) {

        let row00 = row[0].map(n => n.innerHTML)
        let row01 = row[1].map(n => n.innerHTML)
        let row02 = row[2].map(n => n.innerHTML)
        let row03 = row[3].map(n => n.innerHTML)

        let newR0 = row00.filter(n => n != 0)

        newR0.push(...Array(4 - newR0.length).fill(0));

        let curRow = row[i].map(cell => cell.innerHTML);
        let newRow = curRow.filter(n => n != 0)
        newRow.push(...Array(4 - newRow.length).fill(0));


        if (pos == "right") {
            let rightRow = [];
            for (let i = 0; i < 4; i++) {
                if (newRow[i] != 0) {
                    rightRow.push(newRow[i]);
                } else {
                    rightRow.unshift(newRow[i]);
                }
            }
            newRow = [...rightRow];
        }

        combine(newRow, pos)
        console.log(newRow);
        
        
        if (i == 0) {
            for (let j = 0; j < 4; j++) {
                allCells[j].innerHTML = newRow[j]
            }
        }
        if (i == 1) {
            for (let j = 0; j < 4; j++) {
                allCells[j + 4].innerHTML = newRow[j]
            }
        }
        if (i == 2) {
            for (let j = 0; j < 4; j++) {
                allCells[j + 8].innerHTML = newRow[j]
            }
        }
        if (i == 3) {
            for (let j = 0; j < 4; j++) {
                allCells[j + 12].innerHTML = newRow[j];
            }
        }

    }


}

function updown(pos) {
    let allCells = mySelAll(".cell");
    let row = []

    let row0 = []
    let row1 = []
    let row2 = []
    let row3 = []

    row0.push(allCells[0],allCells[4],allCells[8],allCells[12]);
    row1.push(allCells[1],allCells[5],allCells[9],allCells[13]);
    row2.push(allCells[2],allCells[6],allCells[10],allCells[14]);
    row3.push(allCells[3],allCells[7],allCells[11],allCells[15]);
    row.push(row0, row1, row2, row3);

    // console.log(row);

    for (let i = 0; i < 4; i++) {

        let row00 = row[0].map(n => n.innerHTML)
        let row01 = row[1].map(n => n.innerHTML)
        let row02 = row[2].map(n => n.innerHTML)
        let row03 = row[3].map(n => n.innerHTML)

        let newR0 = row00.filter(n => n != 0)

        newR0.push(...Array(4 - newR0.length).fill(0));

        let curRow = row[i].map(cell => cell.innerHTML);
        let newRow = curRow.filter(n => n != 0)
        newRow.push(...Array(4 - newRow.length).fill(0));


        if (pos == "down") {
            let downCol = [];
            for (let i = 0; i < 4; i++) {
                if (newRow[i] != 0) {
                    downCol.push(newRow[i]);
                } else {
                    downCol.unshift(newRow[i]);
                }
            }
            newRow = [...downCol];
        }

        // return newRow;
        combine(newRow, pos)

        if (i == 0) {
            for (let j = 0; j < 4; j++) {
                allCells[j*4].innerHTML = newRow[j]
            }
        }
        if (i == 1) {
            for (let j = 0; j < 4; j++) {
                allCells[(j*4)+1].innerHTML = newRow[j]
            }
        }
        if (i == 2) {
            for (let j = 0; j < 4; j++) {
                allCells[(j*4)+2].innerHTML = newRow[j]
            }
        }
        if (i == 3) {
            for (let j = 0; j < 4; j++) {
                allCells[(j*4)+3].innerHTML = newRow[j];
            }
        }

    }


}

function swipeLeft() {
    leftRight("left")
}

function swipeRight() {
    leftRight("right")
}

function swipeUp() {
    updown("up")
}
function swipeDown() {
    updown("down")
}

function combine(row, pos) {
    for (let i = 0; i < 4; i++) {
        // for(let j = 0;j < 4;j++){
        if (pos == "left" || pos == "up") {
            if (row[i] == row[i + 1] && row[i] != 0) {
                row[i] = (parseInt(row[i]) * 2)
                row[i + 1] = 0

                score += (parseInt(row[i]))
            }
        }
        else if (pos == "right" || pos == "down") {
            if (row[i] == row[i + 1] && row[i] != 0) {
                row[i+1] = (parseInt(row[i]) * 2)
                row[i] = 0;

                score += (parseInt(row[i+1]))

            }
        }
    }
}
// function combineCol(row, pos) {
//     for (let i = 0; i < 4; i++) {
//         // for(let j = 0;j < 4;j++){
//             console.log(pos,row[i],row[i + 1]);
//             if (pos == "up") {
//             if (row[i] == row[i + 1] && row[i] != 0) {
//                 row[i] = (parseInt(row[i]) * 2)
//                 row[i + 1] = 0

//                 score += (parseInt(row[i]))
//             }
//         }
//         // else if (pos == "right") {
//         //     console.log("right",i);
//         //     if (row[i] == row[i + 1] && row[i] != 0) {
//         //         row[i+1] = (parseInt(row[i]) * 2)
//         //         row[i] = 0;

//         //         score += (parseInt(row[i+1]))

//         //     }
//         // }
//     }
// }

document.addEventListener("keyup", (e) => {
    let key = e.key
    if (key == "ArrowLeft") {
        swipeLeft()
        generateRandomCell()
    }
    else if (key == "ArrowRight") {
        swipeRight()
        generateRandomCell()
    }
    else if (key == "ArrowUp") {
        swipeUp()
        generateRandomCell()
    }
    else if (key == "ArrowDown") {
        swipeDown()
        generateRandomCell()
    }
    color();
})
color();
function color() {

    mySel("#score").innerHTML = score;
    let allCells = mySelAll(".cell");
    allCells.forEach(cell => {
        if(cell.innerText == "0" || cell.innerText == 0){
            cell.style.background = "#cdc1b4"
            cell.style.color = "#cdc1b4"
        }
        else if(cell.innerText == "2" || cell.innerText == 2){
            cell.style.background = "#eee4da"
            cell.style.color = "#776e65"
        }
        else if(cell.innerText == "4" || cell.innerText == 4){
            cell.style.background = "#eee1c9"
            cell.style.color = "#776e65"
        }
        else if(cell.innerText == "8" || cell.innerText == 8){
            cell.style.background = "#f3b27a"
            cell.style.color = "#f9f6f2"
        }
        else if(cell.innerText == "16" || cell.innerText == 16){
            cell.style.background = "#f69664"
            cell.style.color = "#fff"
        }
        else if(cell.innerText == "32" || cell.innerText == 32){
            cell.style.background = "#f77c5f"
            cell.style.color = "#f9f6f2"
        }
        else if(cell.innerText == "64" || cell.innerText == 64){
            cell.style.background = "#f75f3b"
            cell.style.color = "#f9f6f2"
        }
        else if(cell.innerText == "128" || cell.innerText == 128){
            cell.style.background = "#edd073"
            cell.style.color = "#f9f6f2"
        }
        else if(cell.innerText == "256" || cell.innerText == 256){
            cell.style.background = "#edcc62"
            cell.style.color = "#f9f6f2"
        }
        else if(cell.innerText == "512" || cell.innerText == 512){
            cell.style.background = "#edc950"
            cell.style.color = "#f9f6f2"
        }
        else if(cell.innerText == "1024" || cell.innerText == 1024){
            cell.style.background = "#edc53f"
            cell.style.color = "#f9f6f2"
        }
        else if(cell.innerText == "2048" || cell.innerText == 2048){
            cell.style.background = "#edc22e"
            cell.style.color = "#fff";
        }
    })
}