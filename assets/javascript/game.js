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
     - Generate random numbers for each game token, y, such that
       y is the number of points the player will increment when
       the assigned game token is clicked.
     ************************************************************* */  
  generateTokenVals() {
    for (var key in this.tokens) {
      this.tokens[key] = Math.floor(Math.random() * (this.#pointsMax - this.#pointsMin + 1)) + this.#pointsMin;
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

  $("img").click(function(event) {
    // DEBUG
    console.log(event.target.id + " clicked!");

    gemCollector.incrementScore(gemCollector.getTokenVal(event.target.id));

    $("#user-score").text(gemCollector.getPlayerScore());
  });
});