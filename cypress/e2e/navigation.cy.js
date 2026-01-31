/**
 * cypress/e2e/navigation.cy.js - Navigation E2E tests
 * Tests clicking each side menu item and verifying pages load correctly
 */

describe("Navigation", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");
  });

  it("should load the home page by default", () => {
    // Verify home page is visible
    cy.get("#home").should("be.visible");
    cy.get("#home").should("have.class", "active");

    // Verify other pages are hidden
    cy.get("#about").should("not.be.visible");
    cy.get("#cardset").should("not.be.visible");
  });

  it("should navigate to Home page when clicking Home button", () => {
    // First navigate away from home
    cy.get('[data-cy="nav-about"]').click();

    // Then navigate back to home
    cy.get('[data-cy="nav-home"]').click();

    // Verify home page is visible
    cy.get("#home").should("be.visible");
    cy.get("#home").should("have.class", "active");

    // Verify the nav button is active
    cy.get('[data-cy="nav-home"]').should("have.class", "active");

    // Verify page content
    cy.get("#home").contains("Welcome to Study Night");
  });

  it("should navigate to About page when clicking About button", () => {
    // Click About navigation button
    cy.get('[data-cy="nav-about"]').click();

    // Verify About page is visible
    cy.get("#about").should("be.visible");
    cy.get("#about").should("have.class", "active");

    // Verify the nav button is active
    cy.get('[data-cy="nav-about"]').should("have.class", "active");

    // Verify home page is hidden
    cy.get("#home").should("not.be.visible");

    // Verify page content
    cy.get("#about").contains("About Study Night");
  });

  it("should navigate to Card Set page when clicking Card Set button", () => {
    // Click Card Set navigation button
    cy.get('[data-cy="nav-cardset"]').click();

    // Verify Card Set page is visible
    cy.get("#cardset").should("be.visible");
    cy.get("#cardset").should("have.class", "active");

    // Verify the nav button is active
    cy.get('[data-cy="nav-cardset"]').should("have.class", "active");

    // Verify home page is hidden
    cy.get("#home").should("not.be.visible");

    // Verify page content
    cy.get("#cardset").contains("Manage Your Cards");
  });

  it("should show correct active state on navigation buttons", () => {
    // Home button should be active initially
    cy.get('[data-cy="nav-home"]').should("have.class", "active");
    cy.get('[data-cy="nav-about"]').should("not.have.class", "active");
    cy.get('[data-cy="nav-cardset"]').should("not.have.class", "active");

    // Click About and check active states
    cy.get('[data-cy="nav-about"]').click();
    cy.get('[data-cy="nav-home"]').should("not.have.class", "active");
    cy.get('[data-cy="nav-about"]').should("have.class", "active");
    cy.get('[data-cy="nav-cardset"]').should("not.have.class", "active");

    // Click Card Set and check active states
    cy.get('[data-cy="nav-cardset"]').click();
    cy.get('[data-cy="nav-home"]').should("not.have.class", "active");
    cy.get('[data-cy="nav-about"]').should("not.have.class", "active");
    cy.get('[data-cy="nav-cardset"]').should("have.class", "active");
  });

  it("should allow navigating through all pages sequentially", () => {
    // Start at Home
    cy.get("#home").should("be.visible");

    // Go to About
    cy.get('[data-cy="nav-about"]').click();
    cy.get("#about").should("be.visible");
    cy.get("#home").should("not.be.visible");

    // Go to Card Set
    cy.get('[data-cy="nav-cardset"]').click();
    cy.get("#cardset").should("be.visible");
    cy.get("#about").should("not.be.visible");

    // Go back to Home
    cy.get('[data-cy="nav-home"]').click();
    cy.get("#home").should("be.visible");
    cy.get("#cardset").should("not.be.visible");
  });
});
