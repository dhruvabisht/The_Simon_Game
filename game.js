// DECLARING AND INITIALIZING THE VARIABLES
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// THIS FUCTION DETECTS THE FIRST KEY STROKE AND THEN STOPS
// IT ACTS LIKE THE START TRIGGER
$(document).keydown(function() {
  started = true;
  if (started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});



// THIS FUNCTION DETECTS AND STORES THE BUTTONS ON WHICH THE USER HAS CLICKED
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (userChosenColour == "red") {
    checkAnswer(0);
  }
  if (userChosenColour == "blue") {
    checkAnswer(1);
  }
  if (userChosenColour == "green") {
    checkAnswer(2);
  }
  if (userChosenColour == "yellow") {
    checkAnswer(3);
  }
});

// THIS FUNCTION GENERATES A RANDOM SEQUENCE OF BUTTONS FOR THE USER
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


  playSound(randomChosenColour);

}



// THIS FUNCTION GENERATES THE SOUND OF THE GAME
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// THIS FUNCTION ADDS THE ANIMATION EFFECT OF BEING PRESSED IN THE WEBSITE
function animatePress(currentColor) {
  var s = "#" + currentColor;
  $(s).addClass("pressed");
  setTimeout(function() {
    $(s).removeClass("pressed");
  }, 100);
}


// THIS FUNCTION COMPARES THE LAST PRESSED BUTTON AND THE SEQUENCE
// OF BUTTONS GEENRATED BY GAME AND PRESSED BY USER
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");

  }

}

// THIS IS A RESETTING FUNCTION
function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
