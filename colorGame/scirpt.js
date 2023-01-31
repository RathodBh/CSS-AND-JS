const mySel = (sel) => document.querySelector(sel);
const mySelAll = (sel) => document.querySelectorAll(sel);

let bhaveshTable = "";
let bhaveshItem = 4;
let bhaveshIndex = 0
let bhaveshDimBtn = ""
let bhaveshScore = 0;

//functions
const bhaveshRandomNums = (num) => {
    return Math.floor(Math.random() * num) + 1
}

if (localStorage.getItem("color-high-score")) {
    mySel(".high-score").innerText = "High score: " + localStorage.getItem("color-high-score")
}

let bhaveshColors = [
    {
        r: bhaveshRandomNums(255),
        g: bhaveshRandomNums(255),
        b: bhaveshRandomNums(255)
    },
    {
        r: bhaveshRandomNums(255),
        g: bhaveshRandomNums(255),
        b: bhaveshRandomNums(255)
    },
    {
        r: bhaveshRandomNums(255),
        g: bhaveshRandomNums(255),
        b: bhaveshRandomNums(255)
    }, {
        r: bhaveshRandomNums(255),
        g: bhaveshRandomNums(255),
        b: bhaveshRandomNums(255)
    },
    {
        r: bhaveshRandomNums(255),
        g: bhaveshRandomNums(255),
        b: bhaveshRandomNums(255)
    },
    {
        r: bhaveshRandomNums(255),
        g: bhaveshRandomNums(255),
        b: bhaveshRandomNums(255)
    }
]

let bhaveshRandomDimId = bhaveshRandomNums(mySelAll("td").length);
mySelAll("td")[bhaveshRandomDimId].style.opacity = "0.5";
mySelAll("td")[bhaveshRandomDimId].classList.add("dimBtn");
mySelAll("td").forEach((currentTd) => {
    currentTd.style.background = `rgb(${bhaveshColors[0].r},${bhaveshColors[0].g},${bhaveshColors[0].b})`;
})

dim()


function dim() {

    // mySelAll("td")[bhaveshRandomDimId].addEventListener("click", () => {
    mySel(".dimBtn").addEventListener("click", () => {

        mySel(".score").innerHTML = `Score is: <span class="red">${++bhaveshScore}<span>`
        mySel("table").parentNode.removeChild(mySel("table"))

        bhaveshTable = "<table>";
        let bhaveshRandomAllTdColor = bhaveshColors[bhaveshRandomNums(bhaveshColors.length - 1)];
        console.log(bhaveshRandomAllTdColor);
        for (let bhaveshi = 0; bhaveshi < bhaveshItem; bhaveshi++) {
            bhaveshTable += "<tr>";
            for (let bhaveshj = 0; bhaveshj < bhaveshItem; bhaveshj++) {
                bhaveshTable += `<td style='height:${100 / bhaveshItem}%;width:${100 / bhaveshItem}%;background:rgb(${bhaveshRandomAllTdColor.r},${bhaveshRandomAllTdColor.g},${bhaveshRandomAllTdColor.b})' id="b${bhaveshIndex++}"></td>`;
            }
            bhaveshTable += "</tr>";
        }
        bhaveshTable += "</table>";
        if (!(bhaveshItem >= 12))
            bhaveshItem++;

        mySel(".box").innerHTML = bhaveshTable;

        let bhaveshTemp = bhaveshRandomNums(mySelAll("td").length - 1);
        mySelAll("td")[bhaveshTemp].style.opacity = "0.7";
        mySelAll("td")[bhaveshTemp].classList.add("dimBtn");

        // bhaveshScore++;
        dim();
    })
}



let timer = 15;
setInterval(() => {
    mySel(".timer").innerText = timer--;
    if (timer <= 10) {
        setInterval(() => {
            mySel(".timer").style.color = "transparent";

            setInterval(() => {
                mySel(".timer").style.color = "white";
            }, 800)
        }, 500)
    }
    if (timer <= -2) {
        if (!localStorage.getItem("color-high-score") || localStorage.getItem("color-high-score") < bhaveshScore) {
            localStorage.setItem("color-high-score", bhaveshScore)
        }
        alert("Game Over!!!!\n Your score is: " + (bhaveshScore));
        window.location.reload();
    }
}, 1000)
