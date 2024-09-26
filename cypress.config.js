const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ohrnw6',
  port: 80,
  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:8080',
  },
});
