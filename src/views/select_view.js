"use strict";

const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (dropdown, num) {
  this.dropdown = dropdown;
  this.num = num;
}

// SelectView.prototype.populate = function(regions) {
//   regions.forEach((region) => {
//     this.dropdown.innerHTML += `<option value="${region}">${region}</option>`;
//   });
// };

SelectView.prototype.bindEvents = function() {
  // PubSub.subscribe("Cards:cards-loaded", (event) => {
  //   const regions = [... new Set(event.detail.map((munro) => {
  //     return munro.region;
  //   }))];
  //   console.log(regions);
  //   this.populate(regions);
  // })

  this.dropdown.addEventListener("change", (event) => {
      const filter = event.target.value;
      console.log(filter);
      PubSub.publish(`SelectView${this.num}:selected-filter`, filter);
      console.log(`Published to SelectView${this.num}:selected-filter`);
    });
};

module.exports = SelectView;
