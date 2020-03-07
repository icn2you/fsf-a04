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
  name = "Collector";
  instructions = "Click one of the icons to get started.";
  collection = {};
  score = 0;
  losses = 0;
  wins = 0;
  randomNum;
  #min = 19;
  #max = 120;
  #pieceMin = 1;
  #pieceMax = 12;

  constructor(name, instructions, collection) {
    this.name = name;
    this.instructions = instructions; 
    this.collection = collection;
  }

  getRandomNum() {
    return this.randomNum;
  }

  generateRandomNum() {
    this.randomNum = Math.floor(Math.random() * (this.#max - this.#min + 1)) + this.#min;
  }

  generatePieceVals() {
    for (var key in this.collection) {
      this.collection[key] = Math.floor(Math.random() * (this.#pieceMax - this.#pieceMin + 1)) + this.#pieceMin;
    }

    // DEBUG
    for (var key in this.collection) {
      console.log(key + " is assigned a value of " + this.collection[key] + ".");
    }
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

  $("img").click(function(event) {
    // DEBUG
    console.log(event.target.id + " clicked!");

    gemCollector.generatePieceVals();

    $("#random-number").text(gemCollector.getRandomNum());
  });
});