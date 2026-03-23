const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '1r81rj',
  allowCypressEnv: false,

  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      repoterPageTitle: 'Relatório de Testes',
      reportDir: 'cypress/reports/html',
      overwrite: false,
      html: true,
      json: true
    },
    baseUrl: "https://api.restful-api.dev",
    specPattern: "cypress/e2e/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
