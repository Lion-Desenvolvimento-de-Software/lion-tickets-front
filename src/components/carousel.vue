<template>
  <div id="carouselExampleInterval" class="carousel slide bg-dark" data-bs-ride="carousel">
    <div class="carousel-inner pointer-click" to="/login">
      <div class="carousel-item active" data-bs-interval="2000">
        <img src="../assets/logo.png" class="w-25" alt="">
      </div>
      <div class="carousel-item" data-bs-interval="2000">
        <img src="../assets/images/google-icon.png" class="w-25" alt="">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'carousel'
}
</script>

<style scoped>
.pointer-click {
  cursor: pointer;
}
</style>