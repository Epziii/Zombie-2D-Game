window.onload = function () {
    var walkImgNum = 1;
    var walkWorkerNum = 0;

    var time = 50;
    var timeWorkerNum = 0;
    var lostSound = new Audio("lost.wav");

    var runImgNum = 1;
    var runWorkerNum = 0;
    var kml = 80;
    var isRun = false;
    var runSound = new Audio("run.mp3");
    runSound.loop = true;

    var attackImgNum = 1;
    var attackWorkerNum = 0;
    var attackCount = 0;
    var attackSound = new Audio("attack.mp3");
    var winSound = new Audio("win.wav");

    function walk() {
        walkWorkerNum = setInterval(() => {
            walkImgNum++;
            if (walkImgNum == 11) walkImgNum = 1;
            document.getElementById("zombie").src = "walk" + walkImgNum + ".png";
        }, 150);
    }

    function timeRemain() {
        timeWorkerNum = setInterval(() => {
            time--;
            if (time == 0) {
                runSound.pause();
                document.getElementById("gameOverModal").style.display = "block";
                lostSound.play();
            }
            document.getElementById("time").innerHTML = "Your Remaining Time: " + time;
        }, 700);
    }

    function run() {
        isRun = true;
        runWorkerNum = setInterval(() => {
            runImgNum++;
            if (runImgNum == 11) runImgNum = 1;
            if (kml < 1450) {
                kml += 10;
                document.getElementById("knight").style.marginLeft = kml + "px";
            }
            if (kml === 1450) {
                clearInterval(runWorkerNum);
                runWorkerNum = 0;
                runSound.pause();
                attack();
                attackSound.play();
            }
            document.getElementById("knight").src = "run" + runImgNum + ".png";
        }, 150);
    }

    function attack() {
        attackWorkerNum = setInterval(() => {
            attackImgNum++;
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
        attackCount++;
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

    // Add this here since now everything is scoped right
    document.addEventListener("keydown", function (event) {
        if (event.key == "Enter" && walkWorkerNum == 0 && runWorkerNum == 0) {
            walk();
            timeRemain();
            run();
            runSound.play();
        }

        if (event.key == " " && attackWorkerNum == 0 && runWorkerNum == 0 && isRun) {
            attack();
            attackSound.play();
        }
    });

    // Preload images to prevent animation issues
    function preloadImages(prefix, count) {
        for (let i = 1; i <= count; i++) {
            const img = new Image();
            img.src = `${prefix}${i}.png`;
        }
    }

    preloadImages("attack", 10);
    preloadImages("run", 10);
    preloadImages("walk", 10);
};
