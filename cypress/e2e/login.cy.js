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
    cy.log(`token: ${window.localStorage.getItem('oidc.user:https://localhost:44360:lion_tickets')}`)
  })
})