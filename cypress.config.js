const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '9776di',
  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:8080',
    env: {
      auth0_username: process.env.AUTH_USERNAME,
      auth0_password: process.env.AUTH0_PASSWORD,
      auth0_scope: process.env.REACT_APP_AUTH0_SCOPE,
      auth0_domain: 'https://f5ea-2804-7f0-aa38-ba-8829-1e84-1096-b60e.ngrok-free.app',
      auth0_client_id: process.env.REACT_APP_AUTH0_CLIENTID,
      auth0_client_secret: process.env.AUTH0_CLIENT_SECRET,
    },
  },
});
