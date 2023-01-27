let b_AllTd = document.querySelectorAll("td");
let b_Index = 1;
let b_Turn = true;
let b_Sel = (sel) => document.querySelector(sel);
let b_checkWin = 0;

b_AllTd.forEach((b_currentTd) => {
    b_currentTd.classList.add(b_Index++);
    // b_currentTd.innerHTML= "&nbsp;";

    b_currentTd.addEventListener("click", () => {

        if (!b_currentTd.classList.contains("clicked")) {

            b_currentTd.innerText = (b_Turn) ? "X" : "O";
            (b_Turn)?b_currentTd.style.color="green":b_currentTd.style.color="blue"

            b_Turn = !b_Turn;
            b_currentTd.classList.add("clicked");
            checkPattern(b_currentTd.innerText);
        }

    })
})

const checkInnerPattern = (b1,b2,b3,b_symbol) => {
    if(b_AllTd[b1].innerText == b_symbol && b_AllTd[b2].innerText == b_symbol && b_AllTd[b3].innerText == b_symbol){
        b_AllTd[b1].style.background = "silver" 
        b_AllTd[b2].style.background = "silver"
        b_AllTd[b3].style.background = "silver"
        b_checkWin = 1;
        alert("Player " + b_symbol + " Wins");
        b_Sel(".btn").style.visibility = "visible"

        //frozen other cells
        b_AllTd.forEach((b__cur)=>{
            b__cur.classList.add("clicked")
        })
    }
    else{
        b_checkWin = 0;
    }
}

const checkPattern = (b_symbol) => {
    let b_Tie = 0;
    checkInnerPattern(0,1,2,b_symbol);
    checkInnerPattern(0,3,6,b_symbol);
    checkInnerPattern(0,4,8,b_symbol);
    checkInnerPattern(1,4,7,b_symbol);
    checkInnerPattern(2,5,8,b_symbol);
    checkInnerPattern(2,4,6,b_symbol);
    checkInnerPattern(3,4,5,b_symbol);
    checkInnerPattern(6,7,8,b_symbol);
    // if(b_AllTd[0].innerText == b_symbol && b_AllTd[1].innerText == b_symbol && b_AllTd[2].innerText == b_symbol){
    //     b_AllTd[0].style.background = "red" 
    //     b_AllTd[1].style.background = "red"
    //     b_AllTd[2].style.background = "red"
    //     b_checkWin = 1;
    // }
    // if(b_AllTd[0].innerText == b_symbol && b_AllTd[3].innerText == b_symbol && b_AllTd[6].innerText == b_symbol){
    //     b_checkWin = 1
    // }
    // else if(b_AllTd[0].innerText == b_symbol && b_AllTd[4].innerText == b_symbol && b_AllTd[8].innerText == b_symbol){
    //     b_checkWin = 1
    // }
    // else if(b_AllTd[1].innerText == b_symbol && b_AllTd[4].innerText == b_symbol && b_AllTd[7].innerText == b_symbol){
    //     b_checkWin = 1
    // }
    // else if(b_AllTd[2].innerText == b_symbol && b_AllTd[5].innerText == b_symbol && b_AllTd[8].innerText == b_symbol){
    //     b_checkWin = 1
    // }
    // else if(b_AllTd[2].innerText == b_symbol && b_AllTd[4].innerText == b_symbol && b_AllTd[6].innerText == b_symbol){
    //     b_checkWin = 1
    // }
    // else if(b_AllTd[3].innerText == b_symbol && b_AllTd[4].innerText == b_symbol && b_AllTd[5].innerText == b_symbol){
    //     b_checkWin = 1
    // }
    // else if(b_AllTd[6].innerText == b_symbol && b_AllTd[7].innerText == b_symbol && b_AllTd[8].innerText == b_symbol){
    //     b_checkWin = 1
    // }

    // if(b_checkWin == 1){
      
    // }

    b_AllTd.forEach((b_current)=>{
        if(b_current.innerText != ""){
            b_Tie++
        }
    })

    if(b_Tie==9 && b_AllTd[0].innerText != "" && b_checkWin == 0){
        alert("Tie");
        b_Sel(".btn").style.visibility = "visible"
    }
        
}

const restartGame = ()=>{
    window.location.reload();
}