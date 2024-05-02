<template>
  <div class="custom-container">
    <div class="custom-layout-boxs">
      <div class="custom-layout-left" v-if="!isProxCadastro">
        <div class="custom-info">
          <h1>{{ isCadastro ? 'Bem Vindo' : 'Bem Vindo de volta' }}</h1>
          <div v-if="!isCadastro">
            <h3>Login</h3>
            <p>Cadastre-se <a @click="trocarLoginOuCadastro()">aqui</a>.</p>
          </div>
          <div v-else>
            <h3>Cadastro</h3>
            <p>Já possui uma conta? Clique <a @click="trocarLoginOuCadastro()">aqui</a> para entrar na sua conta.</p>
          </div>
        </div>
      </div>
      <div class="custom-layout">
        <div class="custom-button-back" v-if="isProxCadastro">
          <button @click="voltar" class="button-back"> {{ "<" }} </button>
        </div>
        <layout-formulario :isCadastro="isCadastro"
                          :usuario="usuario"
                          @entrar="Logar"
                          @cadastrar="Cadastrar"
                          @isProx="isProx"
                          @setMessageError="setMessageError"
                          @loginExternal="loginExternal"
                          @RedefinirSenha="RedefinirSenha"
                          @setMensagemSucesso="setMensagemSucesso"
                          @setLoading="setLoading"
                          ref="layout-form">
          <p class="visible-in-responsible">{{ !isCadastro ? "Cadastre-se " : "Possui uma conta? " }}
            <button class="custom-button-link" @click="trocarLoginOuCadastro()">
              {{ !isCadastro ? "aqui" : "Entrar" }}
            </button>
          </p>
        </layout-formulario>
      </div>
    </div>
    <spinner :isLoading="getIsLoading"></spinner>
  </div>
</template>

<script>
import { Usuario } from '@/assets/classes/Usuario';
import UsuarioServices from '@/assets/services/UsuarioServices';
import layoutFormulario from '@/components/layoutLoginAndSignin.vue';
import spinner from '@/components/spinner.vue';

export default {
  name: 'LoginAndSigninView',
  data() {
    return {
      isCadastro: false,
      isProxCadastro: false,
      emailConfirmation: null,
      isLoading: false,

      mensagem: '',
      isError: false
    };
  },
  emits: ['setMensagemToast', 'setIsError', 'showToast', 'setUsuario'],
  components: {
    layoutFormulario,
    spinner,
  },
  props: {
    usuario: new Usuario()
  },

  computed: {
    getIsError() {
      return this.isError;
    },
    getIsLoading() {
      return this.isLoading;
    }
  },

  mount() {
    this.isLoading = false;
  },
  
  methods: {
    async Logar(email, senha) {
      try {
        this.isLoading = true;
        this.isError = false;
        let obj = {
            "User": email,
            "Password": senha,
            "RememberMe": false
        };
        if (!email || !senha) throw "Email ou senha inválidos!";
        UsuarioServices.login(obj).then(res => {
          this.enviaMensagemAviso(res?.mensagem);
          window.location.href = res.uri;
        }).catch(async err => {
          this.$emit('setMensagemToast', err);
          await this.$emit('setIsError', true);
          this.$emit('showToast');
        }).finally(() => {
          this.isLoading = false;
        });
      } catch(err) {
        this.$emit('setMensagemToast', err);
        await this.$emit('setIsError', true);
        this.isLoading = false;
        this.$emit('showToast');
      }
    },
    async Cadastrar(obj) {
      var mensagem = 'Email de confirmação enviado com sucesso!';
      this.isLoading = true;
      this.isError = false;
      UsuarioServices.register(obj).then(res => {
        this.emailConfirmation = res.data.email;
        UsuarioServices.SendConfirmationEmail(this.emailConfirmation).then(response => {
          mensagem = response.mensagem;
          this.$router.push(response.uri);
        }).catch(async err => {
          this.isError = true;
          mensagem = 'O Email inserido não é válido!';
          console.log(err);
        }).finally(() => {
          this.isLoading = false;
          this.$emit('setIsError', this.isError);
          this.$emit('setMensagemToast', mensagem);
          this.$emit('showToast');
        })
      }).catch(() => {
        mensagem = "Você não completou o formulário corretamente, preencha os campos que faltam!"
        this.$emit('setIsError', true);
        this.$emit('setMensagemToast', mensagem);
        this.$emit('showToast');
        this.isLoading = false;
      })
    },
    async ReenviarConfirmacao() {
      this.isLoading = true;
      this.isError = false;
      UsuarioServices.SendConfirmationEmail(this.emailConfirmation).then(res => {
          this.$emit('setMensagemToast', res);
          console.log(res);
        }).catch(async err => {
          var mensagem = 'Houve um problema ao enviar email de redefinição, tente novamente!';
          this.isError = true;
          this.$emit('setMensagemToast', mensagem);
          await this.$emit('setIsError', true);
          console.log(err);
        }).finally(() => {
          this.isLoading = false;
          this.$emit('showToast');
        })
    },
    async RedefinirSenha(email) {
      this.isLoading = true;
      this.isError = false;
      UsuarioServices.enviarConfirmacaoRedefinicaoSenha(email).then(res => {
        this.$emit('setMensagemToast', 'Email de redefinido enviado com sucesso!');
        this.$emit('setIsError', false);
        console.log(res);
      }).catch(err => {
        this.$emit('setMensagemToast', 'Houve um problema ao enviar email de redefinição, tente novamente!');
        this.$emit('setIsError', true);
        console.log(err);
      }).finally(() => {
        this.isLoading = false;
        this.$emit('showToast');
      })
    },
    isProx(isProx) {
      this.isProxCadastro = isProx;
    },
    trocarLoginOuCadastro() {
      this.isCadastro = !this.isCadastro;
      this.$refs['layout-form'].clear();
    },
    voltar() {
      this.$refs['layout-form'].voltar();
      this.isProxCadastro = false;
    },

    enviaMensagemAviso(mensagem) {
      console.log(mensagem)
      if (!mensagem) return;
      this.$emit('setMensagemToast', mensagem);
      this.$emit('showToast');
    },
    
    async setMessageError(mensagemErro) {
      this.$emit('setMensagemToast', mensagemErro);
      await this.$emit('setIsError', true);
      this.$emit('showToast');
    },

    async setMensagemSucesso(mensagemSucesso) {
      this.$emit('setMensagemToast', mensagemSucesso);
      await this.$emit('setIsError', false);
      this.$emit('showToast');
    },

    async loginExternal(provider) {
      this.isLoading = true;
      window.location.href = `https://localhost:44361/Account/external-login?provider=${provider}`;
    },

    setLoading(isLoading) {
      this.isLoading = isLoading;
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
  backdrop-filter: blur(10px);
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
  backdrop-filter: blur(10px);
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
