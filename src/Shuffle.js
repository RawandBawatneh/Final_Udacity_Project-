/**
 * Shuffle.js - Fisher-Yates shuffle algorithm implementation
 * Shuffles an array in place and returns the shuffled array
 */

/**
 * Shuffles array elements using the Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - The shuffled array (same reference, mutated in place)
 */
export function shuffle(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected an array");
  }

  const arr = array.slice();

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export default shuffle;
