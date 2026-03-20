const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://api.restful-api.dev",
    specPattern: "cypress/e2e/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
