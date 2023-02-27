

var hardness = 1
var level = ""
let speed

// check highscore data from local storage
if (localStorage.getItem("snakeCanvas-E"))
    document.querySelector(".high1").innerHTML = localStorage.getItem("snakeCanvas-E");

if (localStorage.getItem("snakeCanvas-M"))
    document.querySelector(".high2").innerHTML = localStorage.getItem("snakeCanvas-M");

if (localStorage.getItem("snakeCanvas-H"))
    document.querySelector(".high3").innerHTML = localStorage.getItem("snakeCanvas-H");

if (localStorage.getItem("snakeCanvas-V"))
    document.querySelector(".high4").innerHTML = localStorage.getItem("snakeCanvas-V");

//level buttons
const allbtns = document.querySelectorAll(".sbtn");
allbtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        //set levels based on selected level and set speed and show high score on top bar
        if (e.target.classList.contains("easy")) {
            hardness = 2.5;
            level = "Easy"
            speed = 8
            if (localStorage.getItem("snakeCanvas-E"))
                document.querySelector("#high-score").innerHTML = localStorage.getItem("snakeCanvas-E");
        }
        else if (e.target.classList.contains("medium")) {
            hardness = 2.5;
            level = "Medium"
            speed = 15
            if (localStorage.getItem("snakeCanvas-M"))
                document.querySelector("#high-score").innerHTML = localStorage.getItem("snakeCanvas-M");
        }
        else if (e.target.classList.contains("hard")) {
            hardness = 1;
            level = "Hard"
            speed = 20
            if (localStorage.getItem("snakeCanvas-H"))
                document.querySelector("#high-score").innerHTML = localStorage.getItem("snakeCanvas-H");
        }
        if (e.target.classList.contains("vhard")) {
            hardness = 1;
            level = "vHard"
            speed = 25
            if (localStorage.getItem("snakeCanvas-V"))
                document.querySelector("#high-score").innerHTML = localStorage.getItem("snakeCanvas-V");
        }

        document.querySelector(".container").style.display = "block";
        document.querySelector(".level").style.display = "none";

        //show level on game
        document.querySelector("#level").innerHTML = `(${level})`;


        //start game with all parts
        runAllParts()
    });
})


function runAllParts() {

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    var canvasWidth = canvas.width = 500
    var canvasHeight = canvas.height = 500

    if (window.innerWidth < 501) {
        canvasWidth = canvas.width = 300
        canvasHeight = canvas.height = 300
    }


    var rows = 20 * hardness
    var cols = 20 * hardness
    var blockSize = canvasWidth / cols;

    var snakeX = blockSize;
    var snakeY = blockSize;
    var snakeBody = []

    var pause = false
    var gameOver = false

    var velocityX = 0;
    var velocityY = 0;
    var score = 0;

    var foodX, foodY

    let lastTime = 0;
    let i = 0
    let max = 7

    drawFood()
    startGame();
    function startGame(time) {
        requestAnimationFrame(startGame);
        if (gameOver) return

        if ((time - lastTime) / 1000 < (1 / speed)) return
        lastTime = time;
        i = (i < max) ? i = ++i : i = 0

        update()

        //mobile btns
        document.querySelectorAll(".mobileBtns a").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                changeDirection(e.target.id)
            })
        })
        document.addEventListener("keyup", changeDirection);

    }

    //update game and move snake
    function update() {

        //for rotate or reset the snake from 0 to 20 or 20 to 0
        if (snakeX < 0) snakeX = (rows - 1) * blockSize
        if (snakeX > (rows - 1) * blockSize) snakeX = 0
        if (snakeY < 0) snakeY = (cols - 1) * blockSize
        if (snakeY > (cols - 1) * blockSize) snakeY = 0

        //board
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let x = true
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < rows; j++) {
                ctx.strokeStyle = "rgba(255,255,255,0.07)";
                ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
            }
        }

        //food
        ctx.fillStyle = "red";
        ctx.fillRect(foodX, foodY, blockSize, blockSize);

        //head color
        ctx.fillStyle = "white";

        if (pause == false) {
            //when food is eaten by the snake
            if (snakeX == foodX && snakeY == foodY) {
                snakeBody.push([foodX, foodY])
                drawFood()
            }
            for (let i = snakeBody.length - 1; i > 0; i--) {
                snakeBody[i] = snakeBody[i - 1]
            }
            if (snakeBody.length) {
                snakeBody[0] = [snakeX, snakeY]
            }

            //change the position of the snake
            snakeX += velocityX * blockSize;
            snakeY += velocityY * blockSize;
        }

        ctx.fillStyle = "yellogreen"
        ctx.fillRect(snakeX, snakeY, blockSize, blockSize);

        snakeBody.forEach((element, index) => {
            console.log(level);
            //game over
            if (element[0] == snakeX && element[1] == snakeY) {
                gameOver = true

                gameOverFun()
            }

            //bodyDesign
            if (index % 2 == 0) {
                ctx.fillStyle = "rgba(0,255,0,0.6)"
            } else {
                ctx.fillStyle = "rgba(0,255,0,0.9)";
            }
            ctx.fillRect(element[0], element[1], blockSize, blockSize);
        })

    }
    function changeDirection(e) {
        let curKey = e.key || e;
        console.log(curKey, e);

        if (curKey == "ArrowDown" && velocityY != -1) {
            velocityX = 0; velocityY = 1
        }
        else if (curKey == "ArrowUp" && velocityY != 1) {
            velocityX = 0; velocityY = -1
        }
        else if (curKey == "ArrowRight" && velocityX != -1) {
            velocityX = 1; velocityY = 0
        }
        else if (curKey == "ArrowLeft" && velocityX != 1) {
            velocityX = -1; velocityY = 0
        }
        else if (curKey == "1") {
            velocityX = -1; velocityY = -1
        }
        else if (curKey == "2") {
            velocityX = 1; velocityY = -1
        }
        else if (curKey == "3") {
            velocityX = -1; velocityY = 1
        }
        else if (curKey == "4") {
            velocityX = 1; velocityY = 1
        }
        else if (curKey == " ") {
            pause = !pause
            document.querySelector("#pause").innerHTML = pause ? "---GAME PAUSED---" : "click here to more..."
        }

    }

    function drawFood() {
        document.querySelector("#score").innerHTML = ++score
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }


    function gameOver_mode(item, lvl) {
        if (localStorage.getItem(item) && level == lvl) {
            if (score > parseInt(localStorage.getItem(item))) {
                alert(`Well played,"You did new HIGH SCORE "\n Your score: ${score}`)
                localStorage.setItem(item, score)
            }
            else {
                alert("Game Over \n try again to create a new high score")
            }
        }
        else if (level == lvl) {
            alert("Game Over \n you are played first time in this mode"); localStorage.setItem(item, score)
        }
    }


    function gameOverFun() {
        gameOver_mode("snakeCanvas-E", "Easy")
        gameOver_mode("snakeCanvas-M", "Medium")
        gameOver_mode("snakeCanvas-H", "Hard")
        gameOver_mode("snakeCanvas-V", "vHard")

        window.location.reload();
    }
}