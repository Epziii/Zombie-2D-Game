function start(event) {

    if (event.key == "Enter" && walkWorkerNum == 0 && runWorkerNum == 0) {
        walk();
        timeRemain();
        run();
        runSound.play();
    }

    if (event.key == " " && attackWorkerNum == 0 && runWorkerNum == 0 && isRun == true) {
        attack();
        attackSound.play();
    }
}


var walkImgNum = 1;
var walkWorkerNum = 0;

function walk() {
    walkWorkerNum = setInterval(() => {
        walkImgNum++
        if (walkImgNum == 11) {
            walkImgNum = 1;
        }
        document.getElementById("zombie").src = "walk" + walkImgNum + ".png";
    }, 150);
}

var time = 50;
var timeWorkerNum = 0;
var lostSound = new Audio("lost.wav");

function timeRemain() {
    timeWorkerNum = setInterval(() => {
        time--
        if (time == 0) {
            runSound.pause();
            document.getElementById("gameOverModal").style.display = "block";
            lostSound.play();
        }
        document.getElementById("time").innerHTML = "Your Remaining Time: " + time;
    }, 700);
}

var runImgNum = 1;
var runWorkerNum = 0;
var kml = 80;
var isRun = false;
var runSound = new Audio("run.mp3");
runSound.loop = true;
function run() {
    isRun = true;
    runWorkerNum = setInterval(() => {
        runImgNum++
        if (kml < 1450) {
            kml = kml + 10;
            document.getElementById("knight").style.marginLeft = kml + "px";
        }

        if (kml === 1450) {
            clearInterval(runWorkerNum);
            runSound.pause();
            runWorkerNum = 0;
            attack();
            attackSound.play();
        }

        if (runImgNum == 11) {
            runImgNum = 1;
        }
        document.getElementById("knight").src = "Run" + runImgNum + ".png";
    }, 150);
}

var attackImgNum = 1;
var attackWorkerNum = 0;
var attackCount = 0;
var attackSound = new Audio("attack.mp3");
var winSound = new Audio("win.wav");

function attack() {
    attackWorkerNum = setInterval(() => {
        attackImgNum++
        if (attackImgNum == 11) {
            attackImgNum = 1;
            clearInterval(attackWorkerNum);
            attackWorkerNum = 0;
        }
        document.getElementById("knight").src = "attack" + attackImgNum + ".png";
    }, 100);
    if (attackCount == 5) {
        winSound.play();
        document.getElementById("winModal").style.display = "block";
        clearAllIntervals();
    }
    attackCount++
}

function clearAllIntervals() {
    clearInterval(walkWorkerNum);
    clearInterval(timeWorkerNum);
    clearInterval(runWorkerNum);
    clearInterval(attackWorkerNum);
    walkWorkerNum = 0;
    timeWorkerNum = 0;
    runWorkerNum = 0;
    attackWorkerNum = 0;
}