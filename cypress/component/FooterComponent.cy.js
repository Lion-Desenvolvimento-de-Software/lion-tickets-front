import FooterComponent from "@/components/footer-component.vue"

describe('FooterComponent.cy.js', () => {
  it('mount', () => {
    cy.mount(<FooterComponent></FooterComponent>)
  })
})