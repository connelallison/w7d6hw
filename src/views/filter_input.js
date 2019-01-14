"use strict";

const PubSub = require('../helpers/pub_sub.js');

const FilterInput = function (element, num) {
  this.element = element;
  this.num = num
}

// FilterInput.prototype.dropdown = function (text, value, length, category) {
//   this.element.innerHTML = "";
//   const dropdown = document.createElement("select");
//   this.element.appendChild(dropdown);
//   dropdown.innerHTML +=  `<option selected disabled>Select ${category}</option>`;
//   for (let i = 0; i < length; i++) {
//     dropdown.innerHTML +=  `<option value="${value}">${text}</option>`;
//   }
// }

FilterInput.prototype.populate = function(filter) {
  const classes = ["Neutral", "Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];
  const costs = ["0", "1", "2", "3", "4", "5", "6", "7+"];
  const types = ["Minion", "Spell", "Weapon", "Hero"];
  const rarities = ["Legendary", "Epic", "Rare", "Common", "Free"];
  const setTexts = ["Basic", "Classic", "Hall of Fame", "Curse of Naxxramas", "Goblins vs Gnomes", "Blackrock Mountain", "The Grand Tournament", "The League of Explorers", "Whispers of the Old Gods", "One Night in Karazhan", "Mean Streets of Gadgetzan", "Journey to Un'Goro", "Knights of the Frozen Throne", "Kobolds and Catacombs", "The Witchwood", "The Boomsday Project", "Rastakhan's Rumble"];
  const setValues = ["CORE", "EXPERT1", "HOF", "NAXX", "GVG", "BRM", "TGT", "LOE", "OG", "KARA", "GANGS", "UNGORO", "ICECROWN", "LOOTAPALOOZA", "GILNEAS", "BOOMSDAY", "TROLL"];

  switch (filter) {
    case "name":
      this.element.innerHTML = "";
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      this.element.appendChild(nameInput);
      nameInput.addEventListener("change", (event) => {
          const filter = event.target.value;
          console.log(filter);
          PubSub.publish(`FilterInput${this.num}:selected-filter`, filter);
        });
      break;
    case "cardClass":
      this.element.innerHTML = "";
      const classSelect = document.createElement("select");
      this.element.appendChild(classSelect);
      classSelect.innerHTML +=  `<option selected disabled>Select class</option>`;
      for (let i = 0; i < 10; i++) {
        classSelect.innerHTML +=  `<option value="${classes[i].toUpperCase()}">${classes[i]}</option>`;
      }
      classSelect.addEventListener("change", (event) => {
          const filter = event.target.value;
          console.log(filter);
          PubSub.publish(`FilterInput${this.num}:selected-filter`, filter);
          console.log(`Published to FilterInput${this.num}:selected-filter`);
        });
      break;
    case "cost":
      this.element.innerHTML = "";
      const costSelect = document.createElement("select");
      this.element.appendChild(costSelect);
      costSelect.innerHTML +=  `<option selected disabled>Select cost</option>`;
      for (let i = 0; i < 8; i++) {
        costSelect.innerHTML +=  `<option value="${i}">${costs[i]}</option>`;
      }
      costSelect.addEventListener("change", (event) => {
          const filter = event.target.value;
          console.log(filter);
          PubSub.publish(`FilterInput${this.num}:selected-filter`, filter);
        });
      break;
    case "type":
      this.element.innerHTML = "";
      const typeSelect = document.createElement("select");
      this.element.appendChild(typeSelect);
      typeSelect.innerHTML +=  `<option selected disabled>Select type</option>`;
      for (let i = 0; i < 4; i++) {
        typeSelect.innerHTML +=  `<option value="${types[i].toUpperCase()}">${types[i]}</option>`;
      }
      typeSelect.addEventListener("change", (event) => {
          const filter = event.target.value;
          console.log(filter);
          PubSub.publish(`FilterInput${this.num}:selected-filter`, filter);
        });
      break;
    case "rarity":
      this.element.innerHTML = "";
      const raritySelect = document.createElement("select");
      this.element.appendChild(raritySelect);
      raritySelect.innerHTML +=  `<option selected disabled>Select rarity</option>`;
      for (let i = 0; i < 5; i++) {
        raritySelect.innerHTML +=  `<option value="${rarities[i].toUpperCase()}">${rarities[i]}</option>`;
      }
      raritySelect.addEventListener("change", (event) => {
          const filter = event.target.value;
          console.log(filter);
          PubSub.publish(`FilterInput${this.num}:selected-filter`, filter);
        });
      break;
    case "set":
      this.element.innerHTML = "";
      const setSelect = document.createElement("select");
      this.element.appendChild(setSelect);
      setSelect.innerHTML +=  `<option selected disabled>Select set</option>`;
      for (let i = 0; i < 17; i++) {
        setSelect.innerHTML +=  `<option value="${setValues[i]}">${setTexts[i]}</option>`;
      }
      setSelect.addEventListener("change", (event) => {
          const filter = event.target.value;
          console.log(filter);
          PubSub.publish(`FilterInput${this.num}:selected-filter`, filter);
        });
      break;
    default:
  }
};

FilterInput.prototype.bindEvents = function() {
  PubSub.subscribe(`Cards:filter-chosen${this.num}`, (event) => {
    const filter = event.detail;
    console.log(`FilterInput received payload from Cards:filter-chosen${this.num}`);
    this.populate(filter);
  })


};

module.exports = FilterInput;
