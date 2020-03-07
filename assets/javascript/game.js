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
  collection = [];
  score = 0;
  losses = 0;
  wins = 0;
  randomNum;
  #min = 19;
  #max = 120;

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
}

// Execute script once page is fully loaded
$(document).ready(function() {
  let GemCollector = new CollectorGame("Gem Collector", "...", []);
  console.log(GemCollector);

  GemCollector.generateRandomNum();
  console.log(GemCollector.getRandomNum());
});