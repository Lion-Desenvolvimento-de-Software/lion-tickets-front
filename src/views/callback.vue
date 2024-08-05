<template>
  <h1>Loading...</h1>
</template>

<script>
import userManager from '@/services/userManager';

export default {
  name: 'Callback',
  created() {
    this.handleCallback();
  },
  emits: ['setUsuario'],
  methods: {
    async handleCallback() {
      var user = await userManager.getUser();
      if (!user) {
        userManager.signinRedirectCallback().then(res => {
          this.$emit('setUsuario', res.profile);
          this.$router.push('/');
        });
      }
    }
  }
}
</script>