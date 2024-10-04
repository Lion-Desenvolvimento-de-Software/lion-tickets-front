Cypress.Commands.add('loginToAuth0', (username, password) => { 
  // Login on Auth0.
  cy.origin(
    Cypress.env('auth0_domain'),
    { args: { username, password } },
    ({ username, password }) => {
      cy.on('uncaught:exception', (e) => {
        console.log(e);
        return false;
      });
      cy.get('input#username').type(username)
      cy.get('input#passwordInput').type(password, { log: false })
      cy.contains('Logar').click()
    }
  )

  // Ensure Auth0 has redirected us back to the RWA.
  cy.url().should('equal', 'http://localhost:8080/')
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })