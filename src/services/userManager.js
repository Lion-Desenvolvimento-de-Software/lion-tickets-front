import { UserManager, WebStorageStateStore } from "oidc-client";

const userManager = new UserManager({
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority: "https://localhost:44360",  // URL do seu Identity Server
  client_id: "lion_tickets",
  client_secret: "my_super_secret",
  redirect_uri: "http://localhost:8080/callback",
  response_type: "code",
  scope: "openid profile lion_tickets",
  post_logout_redirect_uri: "http://localhost:8080/logout",
  loadUserInfo: true
});

// Adicione logs detalhados em diferentes partes do processo
userManager.events.addUserLoaded(user => {
  console.log('User loaded:', user);
});

userManager.events.addUserUnloaded(() => {
  console.log('User unloaded');
});

userManager.events.addAccessTokenExpiring(() => {
  console.log('Access token expiring...');
});

userManager.events.addAccessTokenExpired(() => {
  console.log('Access token expired');
});

userManager.events.addSilentRenewError(error => {
  console.error('Silent renew error:', error);
});

userManager.events.addUserSignedOut(() => {
  console.log('User signed out');
});

export default userManager;