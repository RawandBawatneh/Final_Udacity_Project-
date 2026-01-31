/**
 * utilityRenderFunctions.js - Helper functions for rendering UI elements
 */

/**
 * Renders a single card element
 * @param {Object} card - Card object with front and back properties
 * @param {number} index - Card index for identification
 * @returns {HTMLElement} - The card DOM element
 */
export function renderCard(card, index) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.setAttribute("data-index", index);
  cardElement.setAttribute("data-cy", `card-${index}`);

  const frontElement = document.createElement("div");
  frontElement.className = "front";
  frontElement.textContent = card.front;

  const backElement = document.createElement("div");
  backElement.className = "back";
  backElement.textContent = card.back;

  cardElement.appendChild(frontElement);
  cardElement.appendChild(backElement);

  return cardElement;
}

/**
 * Renders all cards in a container
 * @param {Array} cards - Array of card objects
 * @param {HTMLElement} container - Container element to render cards into
 */
export function renderCards(cards, container) {
  container.innerHTML = "";

  if (cards.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "emptyState";
    emptyState.textContent = "No cards yet. Add your first card above!";
    container.appendChild(emptyState);
    return;
  }

  cards.forEach((card, index) => {
    const cardElement = renderCard(card, index);
    container.appendChild(cardElement);
  });
}

/**
 * Renders a set badge element
 * @param {string} setName - Name of the card set
 * @returns {HTMLElement} - The set badge DOM element
 */
export function renderSetBadge(setName) {
  const badge = document.createElement("span");
  badge.className = "setBadge";
  badge.textContent = setName;
  badge.setAttribute("data-cy", `set-badge-${setName.toLowerCase().replace(/\s+/g, "-")}`);
  return badge;
}

/**
 * Renders all sets in a container
 * @param {Array} sets - Array of set names
 * @param {HTMLElement} container - Container element to render sets into
 */
export function renderSets(sets, container) {
  container.innerHTML = "";

  if (sets.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "emptyState";
    emptyState.textContent = "No sets created yet. Create your first set above!";
    container.appendChild(emptyState);
    return;
  }

  sets.forEach((setName) => {
    const badge = renderSetBadge(setName);
    container.appendChild(badge);
  });
}

/**
 * Shows an error message
 * @param {string} message - Error message to display
 * @param {HTMLElement} container - Error message container element
 */
export function showError(message, container) {
  container.textContent = message;
  container.classList.add("visible");
}

/**
 * Hides the error message
 * @param {HTMLElement} container - Error message container element
 */
export function hideError(container) {
  container.textContent = "";
  container.classList.remove("visible");
}

/**
 * Validates that a string is not empty
 * @param {string} value - String to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateNotEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export default {
  renderCard,
  renderCards,
  renderSetBadge,
  renderSets,
  showError,
  hideError,
  validateNotEmpty,
};
