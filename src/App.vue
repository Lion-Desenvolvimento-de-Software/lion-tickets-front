<template>
  <spinner :isLoading="loadingFethingData"></spinner>
  <nav-bar :usuario="usuario" 
            v-if="$route.meta.navbar"
            @logof="logof" />
  <router-view :usuario="usuario" />
</template>

<script>
import navBar from '@/components/navBar.vue'
import { Usuario } from './assets/classes/Usuario';
import UsuarioServices from './assets/services/UsuarioServices';
import spinner from './components/spinner.vue';

export default {
  name: 'app',
  data() {
    return {
      loadingFethingData: false,
      error: null,
      usuario: new Usuario()
    }
  },
  compatConfig: { MODE: 3 },
  created() {
    this.fetchData();
  },
  components: {
    navBar,
    spinner
  },
  methods: {
    async fetchData() {
      try {
        this.loadingFethingData = true;
        UsuarioServices.GetUserAuthenticated().then(res => {
          let obj = {
            Id: res.id,
            UserName: res.userName,
            Email: res.email,
            Telefone: res.phoneNumber,
            Genero: res.genero
          }
          this.usuario.AddData(obj);
        }).catch(err => {
          this.error = err;
          console.log(this.error)
        }).finally(() => {
          this.loadingFethingData = false;
        })
      } catch(err) {
        this.loadingFethingData = false;
        console.log(err);
      }
    },
    async logof() {
      this.usuario = null;
      UsuarioServices.logof();
    }
  }
}
</script>

import { mount } from '@vue/test-utils'

// The component to test
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg']
}

test('displays message', () => {
  const wrapper = mount(MessageComponent, {
    props: {
      msg: 'Hello world'
    }
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello world')
})

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
