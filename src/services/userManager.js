import { UserManager, WebStorageStateStore } from "oidc-client";
import axios from '@/services/axios';

const userManager = new UserManager({
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority: "https://f5ea-2804-7f0-aa38-ba-8829-1e84-1096-b60e.ngrok-free.app",  // URL do seu Identity Server
  client_id: "lion_tickets",
  client_secret: "my_super_secret",
  redirect_uri: "http://localhost:8080/callback",
  response_type: "code",
  scope: "openid profile offline_access lion_tickets",
  post_logout_redirect_uri: "http://localhost:8080/",
});

// Adicione logs detalhados em diferentes partes do processo
userManager.events.addUserLoaded(user => {
  console.log('User loaded:', user);
  axios.setAuthorization(user.access_token);
});

userManager.events.addUserUnloaded(() => {
  console.log('User unloaded');
});

userManager.events.addAccessTokenExpiring(() => {
  console.log('Access token expiring...');
  userManager.signinSilent().then(res => {
    console.log("login silencioso: ", res);
  }).catch(err => {
    console.log("Erro Login Silencioso: ", err);
  });
});

userManager.events.addAccessTokenExpired(() => {
  console.log('Access token expired');
});

userManager.events.addSilentRenewError(error => {
  console.error('Silent renew error:', error);
});

userManager.events.addUserSignedOut(() => {
  console.log('User signed out');
  userManager.signinSilent().then(user => {
    console.log('User signed back in silently:', user);
  }).catch(err => {
    console.error('Error signing in silently:', err);
  });
});

export default userManager