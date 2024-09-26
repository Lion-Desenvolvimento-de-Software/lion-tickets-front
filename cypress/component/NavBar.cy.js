import navBar from "@/components/navBar.vue"

describe ("<NavBar></NavBar>", () => {
  it ("general", () => {
    cy.mount(<navBar></navBar>);
    cy.viewport(470, 765)
  })
})