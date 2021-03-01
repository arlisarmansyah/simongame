//INITIALIZE GAME
var buttonColors = ["red", "blue", "green", "yellow"]; //Establish array of all button colors
var gamePattern = []; //Empty array for button pattern

var keydownTimes = 0; //Count number of Keydown done
var level = 0; //Level of the game

var testing;

$(document).keydown(function() {
  while (keydownTimes === 0) {
    keydownTimes++;
    nextSequence();
  }
})

//PLAYERS CLICKED
var userClickedPattern = []; //Initialize array to store player's answer

$(".btn").click(function(event) { //To identify button clicked and check the answer
      var userChosenColor = event.target.id;
      userClickedPattern.push(userChosenColor); //Appending player's click to its array
      playSound(userChosenColor);
      animatePress(userChosenColor);

      //CHECK ANSWER
      //Check players click with computer pattern
      if (gamePattern[(userClickedPattern.length - 1)] !== userClickedPattern[(userClickedPattern.length - 1)]) {
          var checker = false;
        } else {
          checker = true;
        }
        if (checker === true && userClickedPattern.length === gamePattern.length) { //If player is correct, initialize next level
          userClickedPattern = [];
          setTimeout(function() {
            nextSequence();
          }, 1000);
        } else if (checker === false) { // If false, game over and offer player to start over
          //Game Over Visual and Sound
          playSound("wrong");
          $("h1").text("Game Over, Press Any Key to Restart");
          $("body").addClass("game-over");
          setTimeout(function() {
            $("body").removeClass("game-over");
          }, 200);

          //Restart Game;
          keydownTimes = 0;
          level = 0;
          userClickedPattern = [];
          gamePattern = [];
        }
      })

    //FUNCTIONS
    function nextSequence() { // Function to generate random number used to determine button
      var randomNumber = Math.floor(Math.random() * 4);
      var randomChosenColor = buttonColors[randomNumber]; //Determine button randomly using random number generated
      gamePattern.push(randomChosenColor); //Append random button to button (or game) pattern

      $("." + randomChosenColor).fadeOut(100).fadeIn(100); //To make blink effect on random button
      playSound(randomChosenColor);
      level++;
      $("h1").text("Level " + level);
    }

    function playSound(name) { // Function to play playSound
      var buttonSound = new Audio("sounds/" + name + ".mp3"); // To play sound for each random button
      buttonSound.play();
    }

    function animatePress(currentColor) { // Function to Change button format when clicked
      $("#" + currentColor).addClass("pressed");
      setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
    }
