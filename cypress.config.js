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
      auth0_domain: 'https://localhost:44360',
      auth0_client_id: process.env.REACT_APP_AUTH0_CLIENTID,
      auth0_client_secret: process.env.AUTH0_CLIENT_SECRET,
    },
  },
});
