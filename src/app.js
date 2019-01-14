"use strict";

const Cards = require('./models/cards.js');
const SelectView = require('./views/select_view.js');
const FilterInput = require('./views/filter_input.js');
const SelectCard = require("./views/select_card.js");
const DisplayCard = require("./views/display_card.js");

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  // const mapDiv = document.querySelector("#map-div");
  // const mapView = new MapView(mapDiv);
  // mapView.bindEvents();

  const displayCardElement = document.querySelector("#results");
  const displayCardView = new DisplayCard(displayCardElement);
  displayCardView.bindEvents();

  const selectCardElement = document.querySelector("#card-select");
  const selectCardView = new SelectCard(selectCardElement);
  selectCardView.bindEvents();

  const inputElement3 = document.querySelector("#filter-input3");
  const inputView3 = new FilterInput(inputElement3, 3);
  inputView3.bindEvents();
  const inputElement2 = document.querySelector("#filter-input2");
  const inputView2 = new FilterInput(inputElement2, 2);
  inputView2.bindEvents();
  const inputElement1 = document.querySelector("#filter-input1");
  const inputView1 = new FilterInput(inputElement1, 1);
  inputView1.bindEvents();

  const selectElement3 = document.querySelector('#filter-select3');
  const selectView3 = new SelectView(selectElement3, 3);
  selectView3.bindEvents();
  const selectElement2 = document.querySelector('#filter-select2');
  const selectView2 = new SelectView(selectElement2, 2);
  selectView2.bindEvents();
  const selectElement1 = document.querySelector('#filter-select1');
  const selectView1 = new SelectView(selectElement1, 1);
  selectView1.bindEvents();

  // const container = document.querySelector('#country');
  // const countrydetailView = new CountryDetailView(container);
  // countrydetailView.bindEvents();

  const cards = new Cards();
  cards.bindEvents();
  cards.getData();



});
