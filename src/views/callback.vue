<template>
  <h1>Loading...</h1>
</template>

<script>
import userManager from '@/services/userManager';
import axios from 'axios';

export default {
  name: 'Callback',
  mounted() {
    this.handleCallback();
  },
  methods: {
    async handleCallback() {
      var user = await userManager.getUser();
      if (user && user.expired) {
        await userManager.removeUser();
      }
      else {
        userManager.signinRedirectCallback().then(async res => {
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.access_token}`
          this.$router.push('/');
          this.$emit('setUsuario', res.profile);
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }
}
</script>