"use strict";

const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Cards = function(){
  this.cards = [];
  this.criterion1 = null;
  this.criterion2 = null;
  this.criterion3 = null;
  this.filter1 = null;
  this.filter2 = null;
  this.filter3 = null;
}

Cards.prototype.bindEvents = function(){
  for (let i = 1; i < 4; i++) {
    PubSub.subscribe(`SelectView${i}:selected-filter`, (event) => {
      const filter = event.detail;
      this[`criterion${i}`] = event.detail;
      this[`filter${i}`] = null;
      console.log(`criterion${i}: `, this[`criterion${i}`]);
      console.log(`Cards received payload from SelectView${i}:selected-filter`);
      PubSub.publish(`Cards:filter-chosen${i}`, filter);
      console.log(`Published to Cards:filter-chosen${i}`);
    });
    console.log(`Cards subscribed to SelectView${i}:selected-filter`);
  }

  for (let i = 1; i < 4; i++) {
    PubSub.subscribe(`FilterInput${i}:selected-filter`, (event) => {
      console.log(this[`filter${i}`]);
      console.log(`Cards received payload from FilterInput{i}:selected-filter`);
      this[`filter${i}`] = event.detail;
      console.log(`filter${i}: `, this[`filter${i}`]);
      // PubSub.publish(`Cards:filter-chosen${i}`, filter);
      // console.log(`Published to Cards:filter-chosen${i}`);
    });
    console.log(`Cards subscribed to FilterInput${i}:selected-filter`);
  }

  const submitButton = document.querySelector("#submit-filters");
  const resultsDiv = document.querySelector("#results");
  submitButton.addEventListener("click", (event) => {
    let filteredCards = [];
    let filteredCards1 = [];
    let filteredCards2 = [];
    let filteredCards3 = [];
    // console.log(filteredCards);
    // console.log(this.cards[0][this.criterion1]);
    if (this.filter1) {
      console.log("filter1 coerced to true");
      // filteredCards1 = this.cards.filter((card) => {
      //   parseInt(card[this.criterion1]) === parseInt(this.filter1)
      // });
      for (let i = 0; i < this.cards.length; i++) {
        // console.log(this.cards[i][this.criterion1]);
        // console.log(this.filter1);
        if (this.criterion1 === "cost") {
          if (parseInt(this.cards[i][this.criterion1]) === parseInt(this.filter1)) {
            filteredCards1.push(this.cards[i]);
          }
        } else {
          if (this.cards[i][this.criterion1] === this.filter1) {
            filteredCards1.push(this.cards[i]);
          }
        }
      }
      console.log(filteredCards1);
      filteredCards = filteredCards1;
      if (this.filter2) {
        console.log("filter2 coerced to true");
        for (let i = 0; i < filteredCards1.length; i++) {
          if (this.criterion2 === "cost") {
            if (parseInt(filteredCards1[i][this.criterion2]) === parseInt(this.filter2)) {
              filteredCards2.push(filteredCards1[i]);
            }
          } else {
            if (filteredCards1[i][this.criterion2] === this.filter2) {
              filteredCards2.push(filteredCards1[i]);
            }
          }
        }
        console.log(filteredCards2);
        filteredCards = filteredCards2;
        if (this.filter3) {
          console.log("filter3 coerced to true");
          for (let i = 0; i < filteredCards2.length; i++) {
            if (this.criterion3 === "cost") {
              if (parseInt(filteredCards2[i][this.criterion3]) === parseInt(this.filter3)) {
                filteredCards3.push(filteredCards2[i]);
              }
            } else {
              if (filteredCards2[i][this.criterion3] === this.filter3) {
                filteredCards3.push(filteredCards2[i]);
              }
            }
            console.log(filteredCards3);
            filteredCards = filteredCards3;
          }
        }
          }
        console.log(filteredCards);
        switch (filteredCards.length) {
          case 0:
          resultsDiv.innerHTML = "";
          resultsDiv.innerHTML += "<p>No cards found matching these criteria.</p>"
          break;
          case 1:
          resultsDiv.innerHTML = "";
          PubSub.publish("Cards:card-specified", filteredCards[0]);
          console.log("Specified card: ", filteredCards[0]);
          break;
          default:
          resultsDiv.innerHTML = "";
          PubSub.publish("Cards:filtered-cards", filteredCards);
          console.log("Filtered cards: ", filteredCards);
        }

    }
  })
  PubSub.subscribe("SelectCard:selected-card", (event) => {
    PubSub.publish("Cards:card-specified", event.detail);
  });
};


Cards.prototype.getData = function(){
  const request = new Request('https://api.hearthstonejson.com/v1/28329/enUS/cards.collectible.json');
  request.get().then((data) => {
    this.cards = data;
    // PubSub.publish('Cards:cards-loaded', this.cards);
    // // console.log(this.cards);
    // console.log("Published to Cards:cards-loaded");
  });

}

module.exports = Cards;
