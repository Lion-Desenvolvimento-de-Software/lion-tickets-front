describe('Auth0', function () {
  beforeEach(function () {
    cy.visit("http://localhost:8080");

    cy.contains("Entrar").click();
    //cy.task('db:seed')
    cy.loginToAuth0(
      Cypress.env('auth0_username') ?? 'usuario-client',
      Cypress.env('auth0_password') ?? '@Mauricio2212'
    )
  })

  it('shows onboarding', function () {
    cy.log(`token: ${window.localStorage.getItem('oidc.user:https://f5ea-2804-7f0-aa38-ba-8829-1e84-1096-b60e.ngrok-free.app:lion_tickets')}`)
  })
})