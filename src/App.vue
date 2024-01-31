<template>
  <nav-bar :usuario="usuario" 
            v-if="$route.meta.navbar"
            @logof="logof" />
  <router-view :usuario="usuario" />
</template>

<script>
import navBar from '@/components/navBar.vue'
import { Usuario } from './assets/classes/Usuario';
import UsuarioServices from './assets/services/UsuarioServices';

export default {
  name: 'app',
  data() {
    return {
      loadingFethingData: false,
      error: null,
      usuario: new Usuario()
    }
  },
  created() {
    this.fetchData();
  },
  components: {
    navBar
  },
  methods: {
    async fetchData() {
      UsuarioServices.GetUserAuthenticated().then(res => {
        let obj = {
          Id: res.id,
          UserName: res.userName,
          Email: res.email,
          Telefone: res.phoneNumber,
        }
        this.usuario.AddData(obj);
      }).catch(err => {
        this.error = err;
      })
    },
    async logof() {
      this.usuario = null;
      UsuarioServices.logof();
    }
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
