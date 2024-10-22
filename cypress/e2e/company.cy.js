describe('OrganizationView', () => {
  it("visit Organization View", () => {
    cy.origin(
      "https://localhost:44360",
      () => {
        cy.visit("/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dlion_tickets%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8080%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520offline_access%2520lion_tickets%26state%3D4f3b5c18dfb64fc2997c65dc8bfb301c%26code_challenge%3DF4-2Tpreig4XaV0IxWoc5oZ5IN-3enwT99XIxQb7QPw%26code_challenge_method%3DS256%26response_mode%3Dquery")
      }
    );
    cy.visit("/");

    cy.url().should('equal', 'http://localhost:8080/')
  })
})