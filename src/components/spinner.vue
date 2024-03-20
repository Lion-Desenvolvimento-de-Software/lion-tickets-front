<template>
  <div v-if="isLoading" class="custom-global">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'spinner',
  props: {
    isLoading: Boolean
  },
}
</script>

<style scoped>
.custom-global {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
  background: rgba(255, 255, 255, .15);
  backdrop-filter: blur(1px);
}
</style>