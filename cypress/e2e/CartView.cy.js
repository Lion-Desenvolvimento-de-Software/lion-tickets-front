describe('CartView spec', () => {
  it ('Visit CartView', () => {
    cy.visit('/cart');
    cy.contains('Carrinho');
  })
})