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
}

// Execute script once page is fully loaded
$(document).ready(function() {
  let gemCollector = new CollectorGame("Gem Collector", 
    "...", 
    {"amethyst": 0, "citrine": 0, "emerald": 0, "ruby": 0});
  // DEBUG
  // console.log(gemCollector);

  gemCollector.generateRandomNum();
  gemCollector.generateTokenVals();

  $("#random-number").text(gemCollector.getRandomNum());
  $("#user-score").text(gemCollector.getPlayerScore());
  $("#user-wins").text(gemCollector.getPlayerWins());
  $("#user-losses").text(gemCollector.getPlayerLosses());

  $("img").click(function(event) {
    // DEBUG
    console.log(event.target.id + " clicked!");

    gemCollector.incrementScore(gemCollector.getTokenVal(event.target.id));

    $("#user-score").text(gemCollector.getPlayerScore());

    // Handle wins ...
    if (gemCollector.getPlayerScore() === gemCollector.getRandomNum()) {
      gemCollector.incrementWins();
      $("#user-feedback").text("YOU WIN!");
      $("#user-wins").text(gemCollector.getPlayerWins());
    }
    // ... and losses.
    else if (gemCollector.getPlayerScore() > gemCollector.getRandomNum()) {
      gemCollector.incrementLosses();
      $("#user-feedback").text("You lost!");
      $("#user-losses").text(gemCollector.getPlayerLosses());
    }
  });
});