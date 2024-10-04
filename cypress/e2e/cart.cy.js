describe('Cart', () => {
  it ('visit', () => {
    cy.visit('/cart');

    cy.loginToAuth0('usuario-client', '@Mauricio2212');

    cy.visit('/cart');
  })
})