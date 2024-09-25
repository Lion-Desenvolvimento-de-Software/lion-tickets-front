const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ohrnw6',
  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
