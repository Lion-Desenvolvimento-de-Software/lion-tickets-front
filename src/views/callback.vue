<template>
  <h1>Loading...</h1>
</template>

<script>
import userManager from '@/services/userManager';

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
        userManager.signinCallback().then(async res => {
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