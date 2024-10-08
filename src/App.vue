<template>
  <spinner :isLoading="loadingFethingData"></spinner>
  <sidbar-profile :usuario="getUsuario"
    @fecharCollapse="fecharCollapse" 
    @logof="logof"
    :class="usuario && isOpenCollapse ? 'open-collapse' : 'close-collapse'" />
  <nav-bar :usuario="usuario"
            v-if="$route.meta.navbar"
            @openCollapse="openCollapse"
            class="nav" />
  <router-view :usuario="getUsuario"
               @ReenviarCodigo="ReenviarCodigo"
               @setMensagemToast="setMensagemToast"
               @setIsError="setIsError"
               @showToast="showToast"
               @setUsuario="setUsuario"
               @setLoading="setLoading"
               @showToastSuccess="showToastSuccess"
               @showToastError="showToastError" />
  <div class="position-absolute d-flex justify-content-center">
    <toast id="toastId" ref="toast" :mensagem="this.mensagem" class="text-white" :class="!getIsError ? `bg-success` : `bg-danger`" />
  </div>
  <footer-component v-if="$route.meta.navbar" />
</template>

<script>
import navBar from '@/components/navBar.vue'
import { Usuario } from './assets/classes/Usuario';
import UsuarioServices from './services/UsuarioServices';
import spinner from './components/spinner.vue';
import toast from './components/toasts/toast.vue';
import SidbarProfile from './components/colapses/sidbarProfile.vue';
import userManager from './services/userManager';
import axios from '@/services/axios';
import footerComponent from './components/footer-component.vue';

export default {
  name: 'app',
  data() {
    return {
      loadingFethingData: false,
      isError: false,
      usuario: new Usuario(),

      mensagem: null,
      isShow: false,
      isOpenCollapse: false
    }
  },
  created() {
    console.log(process.env.VUE_APP_NOT_SECRET_CODE)
    userManager.getUser().then(res => {
      console.log(res)
      if(!res) throw "usuário deslogado!";
      if(res.expired) throw "usuário deslogado!";
      axios.setAuthorization(res.access_token);
      console.log("Teste = ", res);
      this.setUsuario(res.profile);
    }).catch(async () => {
      await userManager.removeUser();
    })
  },
  components: {
    navBar,
    spinner,
    toast,
    SidbarProfile,
    footerComponent
  },
  computed: {
    getIsError() {
      return this.isError;
    },
    getUsuario() {
      return this.usuario;
    },
		getImagemPerfil() {
			return !this.usuario?.UrlImagemPerfil ? require("@/assets/images/R.png") : this.usuario?.UrlImagemPerfil;
		}
  },
  methods: {
    async checkSession() {
      await userManager.events.addUserSignedIn()
    },
    setUsuario(user) {
      let obj = {
        Id: user.sub,
        UserName: user.name,
        Email: user.email,
        PhoneNumber: user.phone_number,
        Genero: user.gender,
        DataAniversario: user.birthdate,
        Role: user.role
        //UrlImagemPerfil: res.profile.urlImagemPerfil
      }
      this.usuario.AddData(obj);
      
    },
    async logof() {
      this.usuario = null;
      await userManager.signoutRedirect();
      this.isOpenCollapse = false;
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
    
    setIsError(isError) {
      this.isError = isError;
    },

    showToast() {
      this.$refs['toast'].show();
    },
    showToastSuccess(mensagem) {
      this.isError = false;
      this.mensagem = mensagem;
      this.$refs['toast'].show();
    },
    showToastError(mensagem) {
      this.isError = true;
      this.mensagem = mensagem;
      this.$refs['toast'].show();
    },
    openCollapse() {
      this.isOpenCollapse = true;
    },
    fecharCollapse() {
      this.isOpenCollapse = false;
    },
    setLoading(isLoading = false) {
      this.loadingFethingData = isLoading;
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

.open-collapse {
  transform: translateX(0%);
}
.close-collapse {
  transform: translateX(100%);
}
</style>
