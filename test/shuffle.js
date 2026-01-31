/**
 * test/shuffle.js - Unit tests for the shuffle function
 */

import { expect } from "chai";
import { shuffle } from "../src/Shuffle.js";

describe("Shuffle Function", function () {
  describe("shuffle()", function () {
    it("should return an array", function () {
      const input = [1, 2, 3, 4, 5];
      const result = shuffle(input);
      expect(result).to.be.an("array");
    });

    it("should return an array with the same length as the input", function () {
      const input = [1, 2, 3, 4, 5];
      const result = shuffle(input);
      expect(result).to.have.lengthOf(input.length);
    });

    it("should contain all the same elements as the input", function () {
      const input = [1, 2, 3, 4, 5];
      const result = shuffle(input);
      expect(result).to.have.members(input);
    });

    it("should not modify the original array", function () {
      const input = [1, 2, 3, 4, 5];
      const originalCopy = [...input];
      shuffle(input);
      expect(input).to.deep.equal(originalCopy);
    });

    it("should rearrange array indexes (shuffle the array)", function () {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      let differentOrderCount = 0;
      const iterations = 100;

      // Run shuffle multiple times and check if order changes
      for (let i = 0; i < iterations; i++) {
        const result = shuffle(input);
        // Check if at least one element is in a different position
        const hasDifferentOrder = result.some((val, idx) => val !== input[idx]);
        if (hasDifferentOrder) {
          differentOrderCount++;
        }
      }

      // Statistically, shuffle should produce different orders most of the time
      // With 10 elements, probability of same order is 1/10! ≈ 0.00000028%
      expect(differentOrderCount).to.be.greaterThan(iterations * 0.9);
    });

    it("should handle an empty array", function () {
      const input = [];
      const result = shuffle(input);
      expect(result).to.deep.equal([]);
    });

    it("should handle a single-element array", function () {
      const input = [42];
      const result = shuffle(input);
      expect(result).to.deep.equal([42]);
    });

    it("should handle an array with duplicate values", function () {
      const input = [1, 1, 2, 2, 3, 3];
      const result = shuffle(input);
      expect(result).to.have.members(input);
      expect(result).to.have.lengthOf(input.length);
    });

    it("should throw TypeError when input is not an array", function () {
      expect(() => shuffle("not an array")).to.throw(TypeError);
      expect(() => shuffle(123)).to.throw(TypeError);
      expect(() => shuffle(null)).to.throw(TypeError);
      expect(() => shuffle(undefined)).to.throw(TypeError);
      expect(() => shuffle({})).to.throw(TypeError);
    });

    it("should work with arrays of objects", function () {
      const input = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ];
      const result = shuffle(input);
      expect(result).to.have.lengthOf(input.length);
      expect(result).to.have.deep.members(input);
    });

    it("should work with arrays of strings", function () {
      const input = ["apple", "banana", "cherry", "date", "elderberry"];
      const result = shuffle(input);
      expect(result).to.have.lengthOf(input.length);
      expect(result).to.have.members(input);
    });
  });
});
