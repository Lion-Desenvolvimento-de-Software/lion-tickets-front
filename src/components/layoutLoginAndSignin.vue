<template>
  <div class="custom-title">
    <font-awesome-icon :icon="['fas', 'user']" />
  </div>
  <div class="d-flex justify-content-evenly w-75" id="autenticacaoTerceiro">
    <button @click="$emit('loginExternal', 'Google')" class="botao-google"><img src="@/assets/images/google-icon.png" width="30" height="30" /></button>
    <button @click="$emit('loginExternal', 'Facebook')" class="botao-google"><img src="@/assets/images/facebook-logo.png" width="40" height="40" /></button>
  </div>
  <div class="custom-form" v-if="!isProx">
    <input-with-icon Id="email"
                    Type="text"
                    Label="Email"
                    :Required="true"
                    :IsValid="isValidEmail"
                    v-model:model="email" />

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
                    v-model:model="userName" />

    <select-with-icon Id="genero"
                      Label="Genero:"
                      :Required="true"
                      :IsValid="!genero ? false : true"
                      v-model:model="genero"
                      :options="[{'name': 'Masculino', 'value': 1}, {'name': 'Feminino', 'value': 2}]" />

    <input-date Id="dataAniversario"
                    Type="date"
                    Label="Data de Aniv."
                    Name="Data"
                    :Required="true"
                    :IsValid="!dataAniversario ? false : true"
                    v-model:model="dataAniversario" />
  </div>
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
import { Usuario } from '@/assets/classes/Usuario';

export default {
  name: "layoutLoginAndSignin",
  emits: ['entrar', 'cadastrar', 'isProx', 'showModalRedefinicaoSenha', 'setMessageError', 'loginExternal', 'setLoading'],
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
      isError: false,

      isProx: false
    }
  },
  computed: {
    isValidEmail() {
      var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (!this.email)
          return true;
      return this.email.match(pattern) && !this.isError ? true : false;
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
  watch: {
    email() {
      this.isError = false;
    },
    userName() {
      this.isError = false;
    }
  },
  props: {
    isCadastro: Boolean,
    usuario: new Usuario()
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
      this.$emit("setLoading", true);
      this.clearErrors();
      if(this.hasSingin()) {
        if(this.isProx) {
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
            this.$emit('setMessageError', err);
            this.isError = true;
            this.$emit("setLoading", false);
          });
        }
        else {
          await this.hasEmail();
        }
      } else if(!this.isCadastro) {
        if(this.isValidEmail && this.isPasswordValidLength) this.$emit("entrar", this.email, this.senha);
      }
    },
    
    /** Metodos para verificações para código limpo e limpeza nos dados */
    async hasEmail() {
      this.$emit("setLoading", true);
      this.clearErrors();
      UsuarioServices.hasEmail(this.email).then(() => {
        this.isProx = true;
        this.$emit("isProx", this.isProx);
        
        //this.$emit("cadastrar", this.email, this.senha);
      }).catch(err => {
        this.isError = true;
        this.$emit('setMessageError', err);
      }).finally(() => {
        this.$emit("setLoading", false);
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
.botao-google {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: none;
  border: none;
  backdrop-filter: blur(5px);
}
.botao-google:hover {
  transform: rotate(1turn);
  transition: .5s;
}
.botao-google:active {
  box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.25) inset;
  transition: 0s;
}
</style>