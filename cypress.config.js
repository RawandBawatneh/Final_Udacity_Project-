import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:1234",
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.js",
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
  },
});
