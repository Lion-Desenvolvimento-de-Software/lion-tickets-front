<template>
  <div class="container">
    <div class="not-found-general">
      <div class="not-found-lupa">

      </div>
      <div class="not-found-title">
        <h1>404</h1>
        <strong>Página não encontrada</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
.not-found-general {
 height: 100vh;
 align-content: center;
}
.not-found-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}
</style>