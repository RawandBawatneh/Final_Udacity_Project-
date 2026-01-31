/**
 * cypress/e2e/form.cy.js - Form E2E tests
 * Tests Create Set and Add Card forms including happy and unhappy paths
 */

describe("Forms", () => {
  beforeEach(() => {
    // Visit the home page and navigate to Card Set page before each test
    cy.visit("/");
    cy.get('[data-cy="nav-cardset"]').click();
    cy.get("#cardset").should("be.visible");
  });

  describe("Create Set Form", () => {
    it("should display the Create Set form", () => {
      cy.get('[data-cy="create-set-form"]').should("be.visible");
      cy.get('[data-cy="set-name-input"]').should("be.visible");
      cy.get('[data-cy="create-set-submit"]').should("be.visible");
    });

    it("should successfully create a new set (happy path)", () => {
      const setName = "JavaScript Basics";

      // Enter set name
      cy.get('[data-cy="set-name-input"]').type(setName);

      // Submit the form
      cy.get('[data-cy="create-set-submit"]').click();

      // Verify the set was created (should appear in sets container)
      cy.get('[data-cy="sets-container"]').should("contain", setName);

      // Verify the input was cleared
      cy.get('[data-cy="set-name-input"]').should("have.value", "");

      // Verify no error message is shown
      cy.get('[data-cy="error-message"]').should("not.be.visible");
    });

    it("should show error when submitting empty set name (unhappy path)", () => {
      // Submit form without entering anything
      cy.get('[data-cy="create-set-submit"]').click();

      // Verify error message is displayed
      cy.get('[data-cy="error-message"]').should("be.visible");
      cy.get('[data-cy="error-message"]').should("contain", "Please enter a set name");
    });

    it("should show error when submitting whitespace-only set name", () => {
      // Enter only spaces
      cy.get('[data-cy="set-name-input"]').type("   ");

      // Submit form
      cy.get('[data-cy="create-set-submit"]').click();

      // Verify error message is displayed
      cy.get('[data-cy="error-message"]').should("be.visible");
      cy.get('[data-cy="error-message"]').should("contain", "Please enter a set name");
    });

    it("should allow creating multiple sets", () => {
      // Create first set
      cy.get('[data-cy="set-name-input"]').type("Math");
      cy.get('[data-cy="create-set-submit"]').click();

      // Create second set
      cy.get('[data-cy="set-name-input"]').type("Science");
      cy.get('[data-cy="create-set-submit"]').click();

      // Verify both sets exist
      cy.get('[data-cy="sets-container"]').should("contain", "Math");
      cy.get('[data-cy="sets-container"]').should("contain", "Science");
    });
  });

  describe("Add Card Form", () => {
    it("should display the Add Card form", () => {
      cy.get('[data-cy="add-card-form"]').should("be.visible");
      cy.get('[data-cy="card-front-input"]').should("be.visible");
      cy.get('[data-cy="card-back-input"]').should("be.visible");
      cy.get('[data-cy="add-card-submit"]').should("be.visible");
    });

    it("should successfully add a new card (happy path)", () => {
      const front = "What is JavaScript?";
      const back = "A programming language for the web";

      // Enter card details
      cy.get('[data-cy="card-front-input"]').type(front);
      cy.get('[data-cy="card-back-input"]').type(back);

      // Submit the form
      cy.get('[data-cy="add-card-submit"]').click();

      // Verify the card was created
      cy.get('[data-cy="cards-container"]').should("contain", front);
      cy.get('[data-cy="cards-container"]').should("contain", back);

      // Verify inputs were cleared
      cy.get('[data-cy="card-front-input"]').should("have.value", "");
      cy.get('[data-cy="card-back-input"]').should("have.value", "");

      // Verify no error message is shown
      cy.get('[data-cy="error-message"]').should("not.be.visible");
    });

    it("should show error when submitting empty card front (unhappy path)", () => {
      // Only fill in the back
      cy.get('[data-cy="card-back-input"]').type("Some answer");

      // Submit form
      cy.get('[data-cy="add-card-submit"]').click();

      // Verify error message is displayed
      cy.get('[data-cy="error-message"]').should("be.visible");
      cy.get('[data-cy="error-message"]').should("contain", "Please enter a question");
    });

    it("should show error when submitting empty card back (unhappy path)", () => {
      // Only fill in the front
      cy.get('[data-cy="card-front-input"]').type("Some question");

      // Submit form
      cy.get('[data-cy="add-card-submit"]').click();

      // Verify error message is displayed
      cy.get('[data-cy="error-message"]').should("be.visible");
      cy.get('[data-cy="error-message"]').should("contain", "Please enter an answer");
    });

    it("should show error when both fields are empty", () => {
      // Submit form without entering anything
      cy.get('[data-cy="add-card-submit"]').click();

      // Verify error message is displayed
      cy.get('[data-cy="error-message"]').should("be.visible");
    });

    it("should allow creating multiple cards", () => {
      // Create first card
      cy.get('[data-cy="card-front-input"]').type("Question 1");
      cy.get('[data-cy="card-back-input"]').type("Answer 1");
      cy.get('[data-cy="add-card-submit"]').click();

      // Create second card
      cy.get('[data-cy="card-front-input"]').type("Question 2");
      cy.get('[data-cy="card-back-input"]').type("Answer 2");
      cy.get('[data-cy="add-card-submit"]').click();

      // Verify both cards exist
      cy.get('[data-cy="cards-container"]').should("contain", "Question 1");
      cy.get('[data-cy="cards-container"]').should("contain", "Question 2");
    });
  });

  describe("Error Message Behavior", () => {
    it("should hide error message when navigating away", () => {
      // Trigger an error
      cy.get('[data-cy="create-set-submit"]').click();
      cy.get('[data-cy="error-message"]').should("be.visible");

      // Navigate to another page
      cy.get('[data-cy="nav-home"]').click();

      // Navigate back to Card Set
      cy.get('[data-cy="nav-cardset"]').click();

      // Error should be hidden
      cy.get('[data-cy="error-message"]').should("not.be.visible");
    });

    it("should hide error message after successful submission", () => {
      // Trigger an error first
      cy.get('[data-cy="create-set-submit"]').click();
      cy.get('[data-cy="error-message"]').should("be.visible");

      // Now submit with valid data
      cy.get('[data-cy="set-name-input"]').type("Valid Set");
      cy.get('[data-cy="create-set-submit"]').click();

      // Error should be hidden
      cy.get('[data-cy="error-message"]').should("not.be.visible");
    });
  });

  describe("Shuffle Functionality", () => {
    it("should have a shuffle button", () => {
      cy.get('[data-cy="shuffle-button"]').should("be.visible");
    });

    it("should be able to click shuffle button after adding cards", () => {
      // Add a couple of cards
      cy.get('[data-cy="card-front-input"]').type("Q1");
      cy.get('[data-cy="card-back-input"]').type("A1");
      cy.get('[data-cy="add-card-submit"]').click();

      cy.get('[data-cy="card-front-input"]').type("Q2");
      cy.get('[data-cy="card-back-input"]').type("A2");
      cy.get('[data-cy="add-card-submit"]').click();

      // Click shuffle - should not throw error
      cy.get('[data-cy="shuffle-button"]').click();

      // Cards should still exist
      cy.get('[data-cy="cards-container"]').should("contain", "Q1");
      cy.get('[data-cy="cards-container"]').should("contain", "Q2");
    });
  });
});
