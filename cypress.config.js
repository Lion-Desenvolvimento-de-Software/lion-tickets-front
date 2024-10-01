const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '9776di',
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
