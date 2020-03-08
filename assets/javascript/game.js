/******************************************************************************
FSWD:  Christopher B. Zenner
Date:  03/07/2020
File:  game.js
Ver.:  0.1.0 20200306
       
This JS script implements a gem collector game, which generates a random
number and then offers the player an opportunity to match that random number
by incrementing a set of four (4) varying random values, represented by gem
stones.
******************************************************************************/
const crystalCollectorInstr = "<p>You will be given a random number at the start of this game.</p><p>Four crystals appear below, each assigned a unique amount of points. By clicking on a crystal, you will reveal its particular number of points and add them to your total score.</p><p>You win the game by using the crystals to increase your score until it matches the random number displayed at the beginning of the game. If your score goes above the random number, you lose the game.</p><p>The game will automatically restart once you win or lose, and the game will track your total number of wins and losses.</p><p>Have fun!</p>"

class CollectorGame {
  // PROPERTIES
  name = "Collector";
  instructions = "Click one of the icons to get started.";
  tokens = {};
  #score = 0;
  #losses = 0;
  #wins = 0;
  #randomNum;
  #gameMin = 19;
  #gameMax = 120;
  #pointsMin = 1;
  #pointsMax = 12;

  // METHODS
  /* *************************************************************
     Constructor Method
     - Create an object of type CollectorGame
     ************************************************************* */
  constructor(name, instructions, tokens) {
    this.name = name;
    this.instructions = instructions; 
    this.tokens = tokens;
  }

  /* *************************************************************
     Accessor Methods
     - Get object properties
     ************************************************************* */
  getPlayerScore() {
    return this.#score;
  }

  getPlayerLosses() {
    return this.#losses;
  }

  getPlayerWins() {
    return this.#wins;
  }

  getRandomNum() {
    return this.#randomNum;
  }

  getTokenVal(token) { 
    if (this.tokens[token] > 0)
      return this.tokens[token];
    else
      return 0;
  }

  /* *************************************************************
     generateRandomNum()
     - Generate random number for game, x, such that x is the 
       number the player must much by incrementing token values.
     ************************************************************* */
  generateRandomNum() {
    this.#randomNum = Math.floor(Math.random() * (this.#gameMax - this.#gameMin + 1)) + this.#gameMin;
  }

  /* *************************************************************
     generateTokenVals()
     - Generate a unique random number for each game token, y, 
       such that y is the number of points the player will incre-
       ment their score when the assigned game token is clicked.
     ************************************************************* */  
  generateTokenVals() {
    var tokenVal, 
        previousTokenVals = [];

    for (var key in this.tokens) {
      do {
        tokenVal = Math.floor(Math.random() * (this.#pointsMax - this.#pointsMin + 1)) + this.#pointsMin;
      } 
      while (previousTokenVals.indexOf(tokenVal) > -1);

      this.tokens[key] = tokenVal;
      previousTokenVals.push(tokenVal);      
    }

    // DEBUG
    for (var key in this.tokens) {
      console.log(key + " is assigned a value of " + this.tokens[key] + ".");
    }
  }

  /* *************************************************************
     incrementScore()
     - Increase player's score by val.
     ************************************************************* */    
  incrementScore(val) {
    this.#score += val;
  }

  /* *************************************************************
     incrementLosses()
     - Add a loss to player's tallies.
     ************************************************************* */      
  incrementLosses() {
    this.#losses++;
  }

  /* *************************************************************
     incrementWins()
     - Add a win to player's tallies.
     ************************************************************* */    
  incrementWins() {
    this.#wins++
  }

  /* *************************************************************
     generateRandomNum()
     - Generate random number for game, x, such that x is the 
       number the player must much by incrementing token values.
     ************************************************************* */
  resetGameState() {
    this.#score = 0;
    this.generateRandomNum();
    this.generateTokenVals();
  }  
}

// Execute script once page is fully loaded
$(document).ready(function() {
  let gemCollector = new CollectorGame("Gem Collector", 
    crystalCollectorInstr, 
    {"amethyst": 0, "citrine": 0, "emerald": 0, "ruby": 0});
  // DEBUG
  // console.log(gemCollector);

  function refreshUI() {
    $("#random-number").text(gemCollector.getRandomNum());
    $("#user-score").text(gemCollector.getPlayerScore());
    $("#user-wins").text(gemCollector.getPlayerWins());
    $("#user-losses").text(gemCollector.getPlayerLosses());  
  }

  // Initialize game.
  gemCollector.resetGameState();
  refreshUI();

  $("img").click(function(event) {
    // DEBUG
    // console.log(event.target.id + " clicked!");

    // Increment player score by value of token clicked.
    gemCollector.incrementScore(gemCollector.getTokenVal(event.target.id));

    // Display new score.
    refreshUI();

    // Handle wins ...
    if (gemCollector.getPlayerScore() === gemCollector.getRandomNum()) {
      gemCollector.incrementWins();
      $("#user-feedback").text("YOU WIN!");
      gemCollector.resetGameState();
    }
    // ... and losses.
    else if (gemCollector.getPlayerScore() > gemCollector.getRandomNum()) {
      gemCollector.incrementLosses();
      $("#user-feedback").text("You lost!");
      gemCollector.resetGameState();
    }

    // Update tallies.
    refreshUI();
  });
});