var ballArr = [];
var ballMovedFlagArr = [];

ballArr[0] = document.getElementById("ball0");
ballArr[1] = document.getElementById("ball1");
ballArr[2] = document.getElementById("ball2");
ballArr[3] = document.getElementById("ball3");
ballArr[4] = document.getElementById("ball4");
ballArr[5] = document.getElementById("ball5");
ballArr[6] = document.getElementById("ball6");
ballArr[7] = document.getElementById("ball7");


for (i = 0; i < 7; i++) {
    ballMovedFlagArr[i] = 0;
}

var startFlag;
var moveFlag = false;
var abrubtStopFlag = false;
var _seconds;

var score = 0;
var scoreLabel = document.getElementById("score");

function initiateGame() {
    if (!moveFlag) {
        abrubtStopFlag = false;
        startTimer(60, document.getElementById("time"));
        startFlag = setInterval(startGame, 200);
        console.log(startFlag);
    }
}

function startGame() {
    moveFlag = true;
    var random = Math.floor(Math.random() * 8);
    if (ballMovedFlagArr[random] != 1) {
        myMove(ballArr[random], random);
    }
}

function stopGame() {

    clearInterval(startFlag);
    moveFlag = false;
    abrubtStopFlag = true;

    for (i = 0; i < 4; i++) {
        ballMovedFlagArr[i] = 0;
        ballArr[i].style.top = 200 + 'px';
    }
}

function resetGame() {
    location.reload();
}

function myMove(ball, id) {
    var initPos = ball.getBoundingClientRect().top;
    var pos = ball.getBoundingClientRect().top;
    ballMovedFlagArr[id] = 1;
    var direction = -1;
    var pause = false;
    var wait;
    var interval = setInterval(frame, 7);
    function frame() {
        if (moveFlag & !pause) {
            if (direction == -1) {
                pos--;
                ball.style.top = pos + 'px';

                if (pos == (initPos - 120)) {
                    direction = 1;
                    wait = setInterval(pauseBall, 2000);
                }
            } else {
                pos++;
                ball.style.top = pos + 'px';
                if (pos == initPos) {
                    clearInterval(interval);
                    ballMovedFlagArr[id] = 0;
                    ball.style.top = initPos + 'px';
                }
            }
        }
        // console.log(pos + " " + initPos);
    }
    function pauseBall() {
        if (!pause)
            pause = true;
        else {
            pause = false;
            clearInterval(wait);
        }
    }
}

function increamentScore(ball) {
    if (moveFlag) {
        score += 10;
        scoreLabel.innerHTML = score;
        document.getElementById("hit").play();
    }
}

function checkTime() {
    if (_seconds < 0) {
        alert("Time's up!\nYour score is " + score);
    }
}

function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);

        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        _seconds = seconds;

        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {
            alert("Time's up!\nYour score is " + score);
            resetGame();
            start = Date.now() + 1000;
        }
    };

    timer();
    setInterval(timer, 1000);
}

function playBackgroundMusic() {
    document.getElementById("backMusic").play();
}