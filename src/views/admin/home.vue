<template>
  <div class="home">
    <div class="h-100">
      <div class="custom-menu">
        <h1>Teste</h1>
      </div>
    <router-view class="custom-pages"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeAdmin',
}
</script>

<style scoped>
.home {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.custom-menu {
  position: fixed;
  width: 175px;
  height: 100%;
  padding: 15px 0;
  background-color: orange;
  box-shadow: 1px 0px 7px 1px rgba(0, 0, 0, .5);
}

.custom-pages {
  position: absolute;
  right: 0;
  width: calc(100% - 175px);
  height: 100%;
}
</style>