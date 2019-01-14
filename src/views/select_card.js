"use strict";

const PubSub = require('../helpers/pub_sub.js');

const SelectCard = function (dropdown) {
  this.dropdown = dropdown;
}

SelectCard.prototype.populate = function(cards) {
  this.dropdown.innerHTML = `<option selected disabled>Choose card</option>`;

  cards.forEach((card) => {
    this.dropdown.innerHTML += `<option value="${card}">${card.name}</option>`;
  });
};

SelectCard.prototype.bindEvents = function() {
  PubSub.subscribe("Cards:filtered-cards", (event) => {
    // this.dropdown.hidden = false;
    const cards = event.detail;
    console.log(cards);
    this.populate(cards);
  })

  this.dropdown.addEventListener("change", (event) => {
      const card = event.target.value;
      console.log(card);
      PubSub.publish(`SelectCard:selected-card`, card);
      console.log(`Published to SelectCard:selected-card`);
    });
};

module.exports = SelectCard;
