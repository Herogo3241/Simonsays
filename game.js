var buttonColours = ["red" , "blue", "green", "yellow" ];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function(){

    if (!started){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

  }
    }
);

function nextSequence(){

    userClickedPattern = [];

    level++;

    var randomNumber = Math.floor(Math.random() * 4) ;

    var randomChosencolour = buttonColours[randomNumber];

    gamePattern.push(randomChosencolour);

    $('#' + randomChosencolour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosencolour);

    $("#level-title").text("Level " + level);

}

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playsound(userChosenColour);

    animatePressed(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);



});

function playsound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePressed(currentcolor){

    $("#" + currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentcolor).removeClass("pressed");
    },100);
    
}

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("success");

        if (gamePattern.length === userClickedPattern.length){

            setTimeout(function(){
                nextSequence();
            },100);
        }

    }
    else{
        console.log("fail");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"),1000
        });
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }


}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false
}