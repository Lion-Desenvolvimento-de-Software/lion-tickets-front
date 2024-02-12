<template>
  <div class="wreaper">
    <avatar class="mb-5"/>
    <div class="w-100">
      <h2>{{ usuario.UserName }}</h2>
      <p>{{ usuario.Email }}</p>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/avatar.vue'

export default {
  name: 'UserView',
  props: {
    usuario: null
  },
  components: {
    Avatar
  }
}
</script>

<style scoped>
.wreaper {
  display: grid;
  grid-template-columns: 0 100%;
  grid-gap: 11.5em;
  align-items: center;
}
</style>