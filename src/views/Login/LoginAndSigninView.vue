<template>
  <div class="custom-container">
    <div class="custom-layout-boxs">
      <div class="custom-button-troca" v-if="!isProxCadastro">
        <button @click="trocar()"><font-awesome-icon :icon="['fas', 'arrows-rotate']" /></button>
      </div>
      <div class="custom-layout-left" v-if="!isProxCadastro">
        <div class="custom-info">
          <h1>{{ isCadastro ? 'Bem Vindo' : 'Bem Vindo de volta' }}</h1>
          <div v-if="!isCadastro">
            <h3>Cadastre-se</h3>
            <p>Você pode clicando <a @click="trocar()">aqui</a> ou no botão à direita.</p>
          </div>
          <div v-else>
            <h3>Login</h3>
            <p>Já possui uma conta? Clique <a @click="trocar()">aqui</a> para logar na sua conta ou no botão à direita.</p>
          </div>
        </div>
      </div>
      <div class="custom-layout">
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
  </div>
</template>

<script>
import UsuarioServices from '@/assets/services/UsuarioServices';
import layoutFormulario from '@/components/layoutLoginAndSignin.vue';
export default {
    name: 'LoginAndSigninView',
    data() {
        return {
            isCadastro: false,
            isProxCadastro: false
          };
        },
    components: {
      layoutFormulario
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
            this.$refs['layout-form'].setMessageErrorLogin(err.response?.data);
        });
      },
      async Cadastrar(obj) {
        UsuarioServices.post(obj).then(res => {
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
      }
        
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
  background-image: url('@/assets/images/background/wallpaper-gif-4.gif');
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

.custom-button-troca {
  position: absolute;
  margin: 0 140px 0 0;
  z-index: 150;
}

.custom-button-troca button {
  border-radius: 50%;
  width: 75px;
  height: 75px;
  z-index: 150px;
  background: rgba(255, 255, 255, 0.5);
  border: 0;
  box-shadow: 0 0 5px 2px #000;
}

.custom-button-troca button:active {
  box-shadow: 0 0 5px 2px #000 inset;
}
.custom-button-troca button:hover {
  background: rgba(255, 255, 255, 0.75);
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
