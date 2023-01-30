let b_AllTd = document.querySelectorAll("td");
let b_Index = 1;
let b_Turn = true;
let b_Sel = (sel) => document.querySelector(sel);
let b_checkWin = 0;
let b_XScore = 0;
let b_OScore = 0;

b_AllTd.forEach((b_currentTd) => {
    b_currentTd.classList.add(b_Index++);

    b_currentTd.addEventListener("click", () => {

        if (!b_currentTd.classList.contains("clicked")) {

            b_currentTd.innerText = (b_Turn) ? "X" : "O";
            (b_Turn) ? b_currentTd.style.color = "green" : b_currentTd.style.color = "blue"

            b_Turn = !b_Turn;
            b_currentTd.classList.add("clicked");
            checkPattern(b_currentTd.innerText);
        }

    })
})

const checkInnerPattern = (b1, b2, b3, b_symbol) => {

    if (b_AllTd[b1].innerText == b_symbol && b_AllTd[b2].innerText == b_symbol && b_AllTd[b3].innerText == b_symbol) {
        b_AllTd[b1].classList.add("silver");
        b_AllTd[b2].classList.add("silver")
        b_AllTd[b3].classList.add("silver")
        b_checkWin++;

        (b_symbol == "X") ? b_XScore++ : b_OScore++;

        if (b_checkWin >= 1) {
            alert("Player " + b_symbol + " Wins");
            b_Sel(".btn").style.display = "block";
            b_Sel("#result").innerHTML = 
                `<h3 style="text-align:center">Score</h3>
                    <br> Player X : ${b_XScore}
                    <br> Player O : ${b_OScore}`;
        }

        //frozen other cells
        b_AllTd.forEach((b__cur) => {
            b__cur.classList.add("clicked")
        })
    }
}

const checkPattern = (b_symbol) => {
    let b_Tie = 0;

    checkInnerPattern(0, 1, 2, b_symbol);
    checkInnerPattern(0, 3, 6, b_symbol);
    checkInnerPattern(0, 4, 8, b_symbol);
    checkInnerPattern(1, 4, 7, b_symbol);
    checkInnerPattern(2, 5, 8, b_symbol);
    checkInnerPattern(2, 4, 6, b_symbol);
    checkInnerPattern(3, 4, 5, b_symbol);
    checkInnerPattern(6, 7, 8, b_symbol);


    b_AllTd.forEach((b_current) => {
        if (b_current.innerText != "") {
            b_Tie++;
        }
    })
    console.log(b_checkWin);
    if (b_Tie == 9 && b_AllTd[0].innerText != "" && b_checkWin == 0) {
        alert("Tie");
        b_Sel(".btn").style.display = "block";
    }
}

const restartGame = () => {
    // window.location.reload();
    b_AllTd.forEach((cur) => {
        cur.classList.remove("clicked");
        cur.classList.remove("silver");
        cur.innerText = "";
        cur.classList.add("white");
        // cur.style.background = white;
    })
    b_Sel(".btn").style.display = "none"
    b_checkWin = 0;
}
