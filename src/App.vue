<template>
  <nav-bar v-if="$route.meta.navbar" />
  <router-view />
</template>

<script>
import navBar from '@/components/navBar.vue'

export default {
  name: 'app',
  components: {
    navBar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.home {
  padding-top: 4.5rem;
}
</style>
