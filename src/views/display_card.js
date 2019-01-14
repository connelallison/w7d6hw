"use strict";

const PubSub = require('../helpers/pub_sub.js');

const DisplayCard = function (element) {
  this.element = element;
}

DisplayCard.prototype.populate = function(card) {
  this.element.innerHTML = "";
  this.element.innerHTML += `<h2>${card.name}</h2>`;
  this.element.innerHTML += `<img src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png" alt="${card.name}">`;
  this.element.innerHTML += `<p>Cost: ${card.cost} mana</p>`;
  this.element.innerHTML += `<p>Class: ${card.cardClass}</p>`;
  this.element.innerHTML += `<p>Type: ${card.type}</p>`;
  if (card.type === "minion") {
    this.element.innerHTML += `<p>Attack: ${card.attack}</p>`;
    this.element.innerHTML += `<p>Health: ${card.health}</p>`;
  }
  if (card.type === "weapon") {
    this.element.innerHTML += `<p>Attack: ${card.attack}</p>`;
    this.element.innerHTML += `<p>Durability: ${card.durability}</p>`;
  }
  this.element.innerHTML += `<p>Card Text:</p><p>${card.text}</p>`;
  this.element.innerHTML += `<p>Rarity: ${card.rarity}</p>`;
  this.element.innerHTML += `<p>Set: ${card.set}</p>`;
  this.element.innerHTML += `<p>Flavour Text:</p><p>${card.flavor}</p>`;

};

DisplayCard.prototype.bindEvents = function() {
  PubSub.subscribe("Cards:card-specified", (event) => {
    // this.element.hidden = false;
    const card = event.detail;
    // console.log(cards);
    this.populate(card);
  })
};

module.exports = DisplayCard;
