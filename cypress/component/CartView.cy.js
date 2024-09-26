import CartView from "@/views/Payment/CartView.vue"

describe('CartView.cy.js', () => {
  it('Mount', () => {
    cy.mount(CartView, {
      props: {
        cartDetail: [{'id': 'teste'}]
      }
    });
    cy.get('h1');
  })
})