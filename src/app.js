/**
 * app.js - Main application entry point for Study Night
 */

import { shuffle } from "./Shuffle.js";
import {
  renderCards,
  renderSets,
  showError,
  hideError,
  validateNotEmpty,
} from "./utilityRenderFunctions.js";

// Application State
const state = {
  cards: [],
  sets: [],
  currentPage: "home",
};

// DOM Elements
const elements = {
  navButtons: document.querySelectorAll(".navButton"),
  pages: document.querySelectorAll(".page"),
  createSetForm: document.getElementById("createSetForm"),
  addCardForm: document.getElementById("addCardForm"),
  setNameInput: document.getElementById("setName"),
  cardFrontInput: document.getElementById("cardFront"),
  cardBackInput: document.getElementById("cardBack"),
  shuffleButton: document.getElementById("shuffleButton"),
  cardsContainer: document.getElementById("cardsContainer"),
  setsContainer: document.getElementById("setsContainer"),
  errorMessage: document.querySelector('[data-cy="error-message"]'),
};

/**
 * Initialize navigation
 */
function initNavigation() {
  elements.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("data-page");
      navigateTo(page);
    });
  });
}

/**
 * Navigate to a specific page
 * @param {string} pageName - Name of the page to navigate to
 */
function navigateTo(pageName) {
  // Update state
  state.currentPage = pageName;

  // Update active button
  elements.navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-page") === pageName);
  });

  // Update visible page
  elements.pages.forEach((page) => {
    page.classList.toggle("active", page.id === pageName);
  });

  // Hide any errors when navigating
  hideError(elements.errorMessage);
}

/**
 * Initialize Create Set form
 */
function initCreateSetForm() {
  elements.createSetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideError(elements.errorMessage);

    const setName = elements.setNameInput.value;

    if (!validateNotEmpty(setName)) {
      showError("Please enter a set name", elements.errorMessage);
      return;
    }

    // Add set to state
    state.sets.push(setName);

    // Re-render sets
    renderSets(state.sets, elements.setsContainer);

    // Clear form
    elements.setNameInput.value = "";
  });
}

/**
 * Initialize Add Card form
 */
function initAddCardForm() {
  elements.addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideError(elements.errorMessage);

    const front = elements.cardFrontInput.value;
    const back = elements.cardBackInput.value;

    if (!validateNotEmpty(front)) {
      showError("Please enter a question for the front of the card", elements.errorMessage);
      return;
    }

    if (!validateNotEmpty(back)) {
      showError("Please enter an answer for the back of the card", elements.errorMessage);
      return;
    }

    // Add card to state
    state.cards.push({ front, back });

    // Re-render cards
    renderCards(state.cards, elements.cardsContainer);

    // Clear form
    elements.cardFrontInput.value = "";
    elements.cardBackInput.value = "";
  });
}

/**
 * Initialize shuffle functionality
 */
function initShuffle() {
  elements.shuffleButton.addEventListener("click", () => {
    if (state.cards.length > 1) {
      state.cards = shuffle(state.cards);
      renderCards(state.cards, elements.cardsContainer);
    }
  });
}

/**
 * Initialize the application
 */
function init() {
  initNavigation();
  initCreateSetForm();
  initAddCardForm();
  initShuffle();

  // Initial render
  renderCards(state.cards, elements.cardsContainer);
  renderSets(state.sets, elements.setsContainer);

  // Set initial active button
  const homeButton = document.querySelector('[data-page="home"]');
  if (homeButton) {
    homeButton.classList.add("active");
  }
}

// Start the application when DOM is ready
document.addEventListener("DOMContentLoaded", init);
