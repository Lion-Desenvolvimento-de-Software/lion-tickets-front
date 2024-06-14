<template>
  <div class="custom-principal">
    <div class="layout">
      <div class=""></div>
      <div class=""></div>
      <div class=""></div>
      <div class=""></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
}
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 25px;
  padding: 15px;
}

.layout div {
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, .5);
  background-color: rgba(var(--bs-light-rgb),var(--bs-bg-opacity)) !important;
}
</style>