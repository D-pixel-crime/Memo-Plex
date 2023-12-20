var colors = ["red", "blue", "green", "yellow"];

var randomSequence = [];

var userChosenSequence = [];

var level = 0;

var isOver = false;

function nextSequence() {
    userChosenSequence = [];
    $("h1").css("color","powderblue");
    $("h1").text("Level" + " " + level);
    var randomColor = colors[Math.floor(Math.random() * 4)];
    randomSequence.push(randomColor);
    $("." + randomColor).fadeIn(500).fadeOut(500).fadeIn(500);
    sound(randomColor);
    level++;
}

function sound(any) {
    var colorAudio = new Audio("sounds/" + any + ".mp3");
    colorAudio.play();
}

$("button").on("click", function () {
    var userColor = $(this).attr("class");
    userChosenSequence.push((userColor));
    sound(userColor);
    pressAnimation(userColor);
    check(userChosenSequence.length - 1);
});

function pressAnimation(userColor) {
    $("." + userColor).addClass("pressed");
    setTimeout(() => {
        $("." + userColor).removeClass("pressed");
    }, 200);
}

function check(i) {
    if (randomSequence[i] === userChosenSequence[i]) {
        if (randomSequence.length === userChosenSequence.length) {
            isOver = false;
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        if (level !== 0) {
            sound("wrong");
            $("h1").text("Game Over, Press any key/Click here to Start");
            $("h1").css("color", "red");
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);
            gameOver();
        }
    }
}

function gameOver() {
    level = 0;
    randomSequence = [];
    isOver = true;
}

$(document).on("keypress", () => {
    if (level === 0) {
        nextSequence();
        $(".rules").hide();
        $("h1").text("Level " + " " + level);
        level++;
        $("h1").css("color", "powderblue");
    }
});

$("i").on("click",()=>{
    if (level === 0) {
        nextSequence();
        $(".rules").hide();
        $("h1").text("Level " + " " + level);
        level++;
        $("h1").css("color", "powderblue");
    }
});

$("h1").on("click",()=>{
    if(isOver){
        level++;
        nextSequence();
    }
    isOver = false;
});