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
      userManager.signinCallback().then(res => {
        console.log("callback: ", res)
        this.$emit('setUsuario', res.profile);
        this.$router.push('/');
      });
    }
  }
}
</script>