<template>
  <div class="custom-title">
    <font-awesome-icon :icon="['fas', 'user']" />
  </div>
  <div class="custom-form">
    <input-with-icon Id="email"
                    Type="text"
                    Label="Email"
                    :Required="true"
                    :IsValid="isValidEmail"
                    v-model:model="email"
                    :messageError="messageError" />

    <input-with-icon Id="senha"
                    :Type="senhaVisivel ? 'text' : 'password'"
                    Label="Senha"
                    Name="Senha"
                    :Required="true"
                    ClassIcon="visionPassword"
                    :Icon="['fas',  senhaVisivel ? 'lock-open' : 'lock']"
                    :IsValid="isPasswordValidLength"
                    @ViewPassword="senhaVisivel = !senhaVisivel"
                    v-model:model="senha" />
                    
    <input-with-icon Id="confirmarSenha"
                    :Type="senhaConfirmaVisivel ? 'text' : 'password'"
                    Label="Confirmar"
                    Name="Confirmar Senha"
                    :Required="true"
                    ClassIcon="visionPassword"
                    :Icon="['fas',  senhaConfirmaVisivel ? 'lock-open' : 'lock']"
                    :IsValid="isPasswordConfirmed"
                    @ViewPassword="senhaConfirmaVisivel = !senhaConfirmaVisivel"
                    v-if="isCadastro"
                    v-model:model="senhaConfirmada" />
  </div>
  <p v-if="!isCadastro && messageErrorLogin" class="error">{{ messageErrorLogin }}</p>
  <p v-if="!isCadastro">Esqueceu a senha? <a href="">Redefinir</a></p>
  <slot></slot>
  <button class="custom-button" @click="ActionForm">{{ isCadastro ? 'Cadastrar' : 'Entrar' }}</button>
</template>

<script>
import UsuarioServices from '@/assets/services/UsuarioServices';
import inputWithIcon from './inputs/inputWithIcon.vue'

export default {
  name: "layoutLoginAndSignin",
  data() {
    return {
      senhaVisivel: false,
      senhaConfirmaVisivel: false,

      email: '',
      senha: '',
      senhaConfirmada: '',
      messageError: null,
      messageErrorLogin: null
    }
  },
  computed: {
    isValidEmail() {
      var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (!this.email)
          return true;
      return this.email.match(pattern) && this.messageError == null ? true : false;
    },
    isPasswordValidLength() {
      if (!this.senha)
          return true;
      return this.senha.length > 5;
    },
    isPasswordConfirmed() {
      if (!this.senhaConfirmada) return true;
      return this.senha === this.senhaConfirmada;
    }
  },
  props: {
    isCadastro: Boolean,
  },
  components: {
    inputWithIcon
  },
  methods: {
    ViewPassword() {
      this.senhaVisivel = !this.senhaVisivel;
    },
    async ActionForm() {
      this.clearErrors();
      if(this.hasSingin()) {
        UsuarioServices.hasEmail(this.email).then(res => {
          this.clearErrors();
          console.log(res);
        }).catch(err => {
          this.messageError = err;
        })
      } else {
        if(this.isValidEmail && this.isPasswordValidLength) this.$emit("logar", this.email, this.senha);
      }
    },
    setMessageErrorLogin(message) {
      this.messageErrorLogin = message;
    },

    /** Metodos para verificações para código limpo e limpeza nos dados */
    hasSingin() {
      return this.isCadastro && this.hasData() && this.isValidsSingin();
        
    },
    hasData() {
      if(this.isCadastro) return this.email && this.senha && this.senhaConfirmada;
      else return this.email && this.senha;
    },
    isValidsSingin() {
      return this.isValidEmail && this.isPasswordValidLength && this.isPasswordConfirmed;
    },
    clear() {
      this.email = '';
      this.senha = '';
      this.senhaConfirmada = '';
      this.messageError = null;
    },
    clearErrors() {
      this.messageError = null;
      this.messageErrorLogin = null;
    }
  }
}
</script>

<style scoped>
.custom-title {
  font-size: 3rem;
}

.custom-form {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

a {
  color: aqua;
}
a:hover {
  color: #fff;
}

.custom-button {
  width: 100px;
  height: 2rem;
  color: #fff;
  background: none;
  border: 1px solid #fff;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
}
.custom-button:hover {
  background: rgba(0, 0, 0, 0.1);
}
.custom-button:active {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5) inset;
}
.error {
  color: red;
}
</style>