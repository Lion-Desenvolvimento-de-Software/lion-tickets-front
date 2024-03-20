<template>
  <div class="custom-title">
    <font-awesome-icon :icon="['fas', 'user']" />
  </div>
  <div class="custom-form" v-if="!isProx">
    <input-with-icon Id="email"
                    Type="email"
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
  <div class="custom-form" v-else>
    <input-with-icon Id="userName"
                    Type="text"
                    Label="Nome de Usuário"
                    Name="userName"
                    :Required="true"
                    :Icon="['fas',  'user']"
                    :IsValid="isError ? false : true"
                    v-model:model="userName"
                    :messageError="messageError" />

    <select-with-icon Id="genero"
                      Label="Genero:"
                      :Required="true"
                      :IsValid="!genero ? false : true"
                      v-model:model="genero"
                      :options="[{'name': 'Masculino', 'value': 1}, {'name': 'Feminino', 'value': 2}]"
                      :messageError="messageError" />

    <input-date Id="dataAniversario"
                    Type="date"
                    Label="Data de Aniv."
                    Name="Data"
                    :Required="true"
                    :IsValid="!dataAniversario ? false : true"
                    v-model:model="dataAniversario"
                    :messageError="messageError" />
  </div>
  <p v-if="!isCadastro && messageErrorLogin" class="error">{{ messageErrorLogin }}</p>
  <p v-if="!isCadastro">Esqueceu a senha? <button class="button-link-redefinicao" @click="$emit('showModalRedefinicaoSenha')">Redefinir</button></p>
  <slot></slot>
  <button class="custom-button" @click="ActionForm">{{ 
    isCadastro 
      ? isProx 
        ? 'Cadastrar' 
        : 'Continuar' 
      : 'Entrar' 
    }}
  </button>
</template>

<script>
import UsuarioServices from '@/assets/services/UsuarioServices';
import inputWithIcon from './inputs/inputWithIcon.vue'
import selectWithIcon from './inputs/selectWithIcon.vue';
import inputDate from './inputs/inputDate.vue';

export default {
  name: "layoutLoginAndSignin",
  emits: ['entrar', 'cadastrar', 'isProx', 'showModalRedefinicaoSenha'],
  data() {
    return {
      senhaVisivel: false,
      senhaConfirmaVisivel: false,

      userName: '',
      email: '',
      senha: '',
      senhaConfirmada: '',
      genero: '',
      dataAniversario: '',
      messageError: null,
      messageErrorLogin: null,
      isError: false,

      isProx: false
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
    inputWithIcon,
    selectWithIcon,
    inputDate
  },
  methods: {
    ViewPassword() {
      this.senhaVisivel = !this.senhaVisivel;
    },
    async ActionForm() {
      this.clearErrors();
      if(this.hasSingin()) {
        if(this.isProx) {
          console.log(this.genero)
          UsuarioServices.hasUserName(this.userName).then(() => {
            this.clearErrors();
            let obj = {
              "UserName": this.userName,
              "Email": this.email,
              "PasswordHash": this.senha,
              "Genero": Number(this.genero),
              "DataAniversario": this.dataAniversario
            };
            this.$emit("cadastrar", obj);
          }).catch(err => {
            this.messageError = err;
            this.isError = true;
          })
        }
        else {
          this.hasEmail();
        }
      } else if(!this.isCadastro) {
        if(this.isValidEmail && this.isPasswordValidLength) this.$emit("entrar", this.email, this.senha);
      }
    },
    setMessageErrorLogin(message) {
      this.messageErrorLogin = message;
    },
    
    /** Metodos para verificações para código limpo e limpeza nos dados */
    hasEmail() {
      UsuarioServices.hasEmail(this.email).then(() => {
        this.clearErrors();
        this.isProx = true;
        this.$emit("isProx", this.isProx);
        
        //this.$emit("cadastrar", this.email, this.senha);
      }).catch(err => {
        this.messageError = err;
      })
    },
    
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
      this.clearErrors();
    },
    clearErrors() {
      this.messageError = null;
      this.messageErrorLogin = null;
      this.isError = false;
    },
    voltar() {
      this.isProx = false;
      this.clearErrors();
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
.button-link-redefinicao {
  background: none;
  border: none;
  border-bottom: 1px solid;
  color: aqua;
  padding: 0;
}
.button-link-redefinicao:hover {
  color: aquamarine;
}
.button-link-redefinicao:active {
  color: #fff;
}
</style>