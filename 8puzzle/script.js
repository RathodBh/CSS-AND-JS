//variables
const mySel = (sel) => document.querySelector(sel);
const allBtns = document.querySelectorAll(".btn");
let allDataItems = [1, 2, 3, 4, 5, 6, 7, 8];
let randNums = []
let i = allDataItems.length;
j = 0;

let index = 0;
let moves = 1;

if(localStorage.getItem("high-score")){
    mySel(".high-score").innerHTML = `Highest Score: <span class='red'> ${localStorage.getItem("high-score")} moves</span>`;
}
// functions
//generated random order numbers
while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    randNums.push(allDataItems[j]);
    allDataItems.splice(j, 1)
}

//works
allBtns.forEach((curBtn) => {
    // curBtn.style.order = index;
    if (index != randNums.length) {
        curBtn.innerText = randNums[index++]
        // curBtn.style.background = "green"
    }
})

allBtns.forEach((curBtn) => {
    curBtn.addEventListener("click", (e) => {
        if (!curBtn.classList.contains("btn8")) {

            mySel(".subtitle").innerHTML = `moves: <span class="red">${moves++}</span>`;

            let currentBtnIndex = [...allBtns].indexOf(curBtn);

            if (currentBtnIndex == 0 || currentBtnIndex == 1 || currentBtnIndex == 3 || currentBtnIndex == 4 || currentBtnIndex == 6 || currentBtnIndex == 7) {
                if (allBtns[currentBtnIndex + 1].classList.contains("btn8")) {
                    curBtn.classList.add("btn8");
                    curBtn.classList.add("clear");
                    curBtn.classList.remove("btn" + currentBtnIndex);

                    let tempNum = curBtn.innerText;
                    curBtn.innerText = ""
                    allBtns[currentBtnIndex + 1].classList.remove("btn8")
                    allBtns[currentBtnIndex + 1].classList.add("btn" + currentBtnIndex);
                    allBtns[currentBtnIndex + 1].classList.remove("clear");
                    allBtns[currentBtnIndex + 1].innerText = tempNum;

                    checkWin();
                }
            }
            if (currentBtnIndex == 1 || currentBtnIndex == 2 || currentBtnIndex == 4 || currentBtnIndex == 5 || currentBtnIndex == 7 || currentBtnIndex == 8) {
                if (allBtns[currentBtnIndex - 1].classList.contains("clear")) {

                    let tmpClass = curBtn.classList[1];

                    curBtn.classList.add("btn8");
                    curBtn.classList.add("clear");
                    curBtn.classList.remove(tmpClass);

                    let tempNum = curBtn.innerText;
                    curBtn.innerText = ""
                    allBtns[currentBtnIndex - 1].classList.remove("btn8")
                    allBtns[currentBtnIndex - 1].classList.add(tmpClass);
                    allBtns[currentBtnIndex - 1].classList.remove("clear");

                    allBtns[currentBtnIndex - 1].innerText = tempNum;

                    checkWin()
                }
            }
            //up
            if (currentBtnIndex == 3 || currentBtnIndex == 4 || currentBtnIndex == 5 || currentBtnIndex == 6 || currentBtnIndex == 7 || currentBtnIndex == 8) {
                if (allBtns[currentBtnIndex - 3].classList.contains("clear")) {

                    let tmpClass = curBtn.classList[1];

                    curBtn.classList.add("btn8");
                    curBtn.classList.add("clear");
                    curBtn.classList.remove(tmpClass);

                    let tempNum = curBtn.innerText;
                    curBtn.innerText = ""
                    allBtns[currentBtnIndex - 3].classList.remove("btn8")
                    allBtns[currentBtnIndex - 3].classList.add(tmpClass);
                    allBtns[currentBtnIndex - 3].classList.remove("clear");

                    allBtns[currentBtnIndex - 3].innerText = tempNum;

                    checkWin()
                }
            }

            //down
            if (currentBtnIndex == 3 || currentBtnIndex == 4 || currentBtnIndex == 5 || currentBtnIndex == 1 || currentBtnIndex == 2 || currentBtnIndex == 0) {
                if (allBtns[currentBtnIndex + 3].classList.contains("clear")) {

                    let tmpClass = curBtn.classList[1];

                    curBtn.classList.add("btn8");
                    curBtn.classList.add("clear");
                    curBtn.classList.remove(tmpClass);

                    let tempNum = curBtn.innerText;
                    curBtn.innerText = ""
                    allBtns[currentBtnIndex + 3].classList.remove("btn8")
                    allBtns[currentBtnIndex + 3].classList.add(tmpClass);
                    allBtns[currentBtnIndex + 3].classList.remove("clear");

                    allBtns[currentBtnIndex + 3].innerText = tempNum;

                    checkWin()
                }
            }
        }

    })
})

function checkWin(){

    let win = 0;
    for(let i=0; i < allBtns.length; i++){
        if(allBtns[i].innerHTML == i+1){
            win++;
        }
    }
    if(win==8){
        alert("Finally You win with " + moves + " moves");
        if(localStorage.getItem("high-score")){
            if(moves < localStorage.getItem("high-score"))
                localStorage.setItem("high-score",moves)
        }else{
            localStorage.setItem("high-score",moves);
        }
        mySel(".reset").style.visibility = "visible";
        mySel(".subtitle").innerText = ""
        moves = 1;
        // window.location.reload()
    }
}

mySel(".reset").addEventListener("click",()=>{
   if(confirm("Are you sure want to restart ?")){
    window.location.reload()
   }
})