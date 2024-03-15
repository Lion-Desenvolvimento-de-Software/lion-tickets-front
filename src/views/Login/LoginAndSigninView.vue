<template>
  <div class="custom-container">
    <div class="custom-layout-boxs">
      <div class="custom-layout-left" v-if="!isProxCadastro">
        <div class="custom-info">
          <h1>{{ isCadastro ? 'Bem Vindo' : 'Bem Vindo de volta' }}</h1>
          <div v-if="!isCadastro">
            <h3>Login</h3>
            <p>Cadastre-se <a @click="trocar()">aqui</a>.</p>
          </div>
          <div v-else>
            <h3>Cadastro</h3>
            <p>Já possui uma conta? Clique <a @click="trocar()">aqui</a> para entrar na sua conta.</p>
          </div>
        </div>
      </div>
      <div class="custom-layout">
        <div class="custom-button-back" v-if="isProxCadastro">
          <button @click="voltar" class="button-back"> {{ "<" }} </button>
        </div>
        <layout-formulario :isCadastro="isCadastro"
                          @entrar="Logar"
                          @cadastrar="Cadastrar"
                          @isProx="isProx"
                          ref="layout-form">
          <p class="visible-in-responsible">{{ !isCadastro ? "Cadastre-se " : "Possui uma conta? " }}
            <button class="custom-button-link" @click="trocar()">
              {{ !isCadastro ? "aqui" : "Entrar" }}
            </button>
          </p>
        </layout-formulario>
      </div>
    </div>
    <modal-confirmation-email id="modal_aviso" ref="modal" @reenviarConfirmacao="ReenviarConfirmacao" />
  </div>
</template>

<script>
import UsuarioServices from '@/assets/services/UsuarioServices';
import layoutFormulario from '@/components/layoutLoginAndSignin.vue';
import ModalConfirmationEmail from '@/components/modals/ModalConfirmationEmail.vue';
export default {
  name: 'LoginAndSigninView',
  data() {
    return {
      isCadastro: false,
      isProxCadastro: false,
      emailConfirmation: null
    };
  },
  components: {
    layoutFormulario,
    ModalConfirmationEmail
  },
  methods: {
    async Logar(email, senha) {
      let obj = {
          "User": email,
          "Password": senha,
          "RememberMe": false
      };
      UsuarioServices.login(obj).then(() => {
        window.location.pathname = '/';
      }).catch(err => {
        var userError = err.response?.data?.errors?.User;
        var passwordError = err.response?.data?.errors?.Password;
        if(userError && passwordError) this.$refs['layout-form'].setMessageErrorLogin(`${userError[0]} e ${passwordError[0]} obrigatórios!`);
        else this.$refs['layout-form'].setMessageErrorLogin(userError ? `${userError[0]} obrigatório!` : `${passwordError[0]} obrigatória!`);
      });
    },
    async Cadastrar(obj) {
      UsuarioServices.post(obj).then(res => {
        this.emailConfirmation = res.data.email;
        UsuarioServices.SendConfirmationEmail(this.emailConfirmation).then(res => {
          console.log(res);
          this.$refs.modal.show();
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err);
      })
    },
    async ReenviarConfirmacao() {
      UsuarioServices.SendConfirmationEmail(this.emailConfirmation).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
    },
    trocar() {
      this.isCadastro = !this.isCadastro;
      this.$refs['layout-form'].clear()
    },
    isProx(isProx) {
      this.isProxCadastro = isProx;
    },
    voltar() {
      this.$refs['layout-form'].voltar();
      this.isProxCadastro = false;
    },
      
  },
}
</script>

<style scoped>
*::before,
*::after {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.custom-button-link {
  background: none;
  border: none;
  padding: 0;
  border-bottom: 1px solid;
  color: aqua;
}
.custom-button-link:hover {
  color: #fff;
}

.custom-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/images/background/wallpaper-leao.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.custom-layout-boxs {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  box-shadow: 0 0 25px 0 rgb(255, 179, 144);
}

.custom-layout-left {
  background: rgba(0, 0, 0, 0.2);
  width: 260px;
  height: 520px;
  color: #fff;
  backdrop-filter: blur(5px);
  border: 1px solid #fff;
}

.custom-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 520px;
  color: #fff;
  padding: 0 50px;
  backdrop-filter: blur(5px);
  border: 1px solid #fff;
}

.custom-info a {
  color: aqua;
  cursor: pointer;
  border-bottom: 1px solid;
}

.custom-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  margin: 0 10px;
}

.custom-info p, h3 {
  margin: 2rem 0;
}

.visible-in-responsible {
  display: none;
}

.custom-button-back {
  position: absolute;
  display: flex;
  height: 2rem;
  inset: 1rem 0 0 1rem;
  padding: 0 8px;
}

.button-back {
  font-family: monospace;
  font-size: 25px;
  transition: 0.2s;
  cursor: pointer;
  height: 0;
  color: aqua;
  background: none;
  border: 0;
}
.button-back:hover {
  font-size: 30px;
  color: aquamarine;
}
.button-back:active {
  font-size: 27px;
  color: #fff;
}

@media only screen and (max-width: 690px) {
  .visible-in-responsible {
    display: block;
  }
  .custom-layout-left {
    display: none;
  }
  .custom-button-troca {
    display: none;
  }
}

@media only screen and (max-width: 435px) {
  .custom-layout {
    width: 18rem;
    height: 30rem;
  }
}
</style>
