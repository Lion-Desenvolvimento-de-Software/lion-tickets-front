<template>
  <spinner :isLoading="loadingFethingData"></spinner>
  <colapse-profile />
  <nav-bar :usuario="usuario" 
            v-if="$route.meta.navbar"
            @logof="logof"
            class="nav" />
  <router-view :usuario="usuario"
                @ConfirmarCodigo="ConfirmarCodigo"
                @ReenviarCodigo="ReenviarCodigo"
                @setMensagemToast="setMensagemToast"
                @setIsError="setIsError"
                @showToast="showToast"
                @setUsuario="setUsuario" />
  <div class="d-flex justify-content-center">
    <toast id="toastId" ref="toast" :mensagem="this.mensagem" class="text-white" :class="!getIsError ? `bg-success` : `bg-danger`" />
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import { Usuario } from './assets/classes/Usuario';
import UsuarioServices from './assets/services/UsuarioServices';
import spinner from './components/spinner.vue';
import toast from './components/toasts/toast.vue';
import colapseProfile from './components/colapses/colapseProfile.vue';

export default {
  name: 'app',
  data() {
    return {
      loadingFethingData: false,
      isError: false,
      usuario: new Usuario(),

      mensagem: null,
      isShow: false
    }
  },
  compatConfig: { MODE: 3 },
  created() {
    this.fetchData();
  },
  components: {
    navBar,
    spinner,
    toast,
    colapseProfile
  },
  computed: {
    getIsError() {
      return this.isError;
    }
  },
  methods: {
    setUsuario(user) {
      let obj = {
        Id: user.id,
        Email: user.email,
        UserName: user.userName
      };
      this.usuario.AddData(obj);
    },
    async fetchData() {
      try {
        this.loadingFethingData = true;
        UsuarioServices.GetUserAuthenticated().then(async res => {
          let obj = {
            Id: res.id,
            UserName: res.userName,
            Email: res.email,
            PhoneNumber: res.phoneNumber,
            Genero: res.genero
          }
          this.usuario.AddData(obj);
          window.localStorage.setItem("isAuthenticated", true);
        }).catch(err => {
          console.log(err);
          window.localStorage.clear();
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
      await UsuarioServices.logof();
    },
    async ConfirmarCodigo(code) {
      var mensagem = "";
      this.loadingFethingData = true;
      try {
        if (code.length < 6) throw 'Código inválido!';
        mensagem = await UsuarioServices.confirmar_codigo_e_conta(this.$route.params.email, code);
        await this.setIsError(false);
        this.setMensagemToast(mensagem);
        console.log(mensagem);
        location.href = '/';
      } catch(err) {
        mensagem = err;
        await this.setIsError(true);
        this.setMensagemToast(mensagem);
      } finally {
        this.showToast();
        this.loadingFethingData = false;
      }
    },

    async ReenviarCodigo(email) {
      var mensagem = "";
      this.loadingFethingData = true;
      try {
        mensagem = await UsuarioServices.reenviarCodigo(email, this.$route.params.email);
        await this.setIsError(false);
        this.setMensagemToast(mensagem);
      } catch(err) {
        mensagem = err;
        await this.setIsError(true);
        this.setMensagemToast(mensagem);
      } finally {
        this.showToast();
        this.loadingFethingData = false;
      }
    },

    setMensagemToast(mensagem) {
      this.mensagem = mensagem;
    },
    
    async setIsError(isError) {
      this.isError = isError;
    },

    showToast() {
      this.$refs['toast'].show();
    },
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
