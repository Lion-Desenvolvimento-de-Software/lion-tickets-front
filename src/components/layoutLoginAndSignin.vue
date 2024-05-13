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
  <p v-if="!isCadastro">Esqueceu a senha? <button class="button-link-redefinicao" @click="redefinicaoSenha('showModalRedefinicaoSenha')">Redefinir</button></p>
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
  emits: ['entrar', 'cadastrar', 'isProx', 'showModalRedefinicaoSenha', 'setMessageError', 'loginExternal', 'setLoading', 'setMensagemSucesso', 'RedefinirSenha'],
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
      if (!this.email && !this.isError)
          return true;
      return this.email.match(pattern) ? true : false;
    },
    isPasswordValidLength() {
      if (!this.senha && !this.isError)
          return true;
      return this.senha.length > 5;
    },
    isPasswordConfirmed() {
      if (!this.senhaConfirmada && !this.isError) return true;
      else if (!this.senhaConfirmada && this.isError) return false;
      return this.senha === this.senhaConfirmada;
    }
  },
  watch: {
    email() {
      this.isError = false;
    },
    userName() {
      this.isError = false;
    },
    senha() {
      if(this.isCadastro) this.isPasswordConfirmed = (this.senha === this.senhaConfirmada);
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
      try {
        this.$emit("setLoading", true);
        this.clearErrors();
        if(this.isCadastro) {
          this.hasDataRegister();
          this.isValidsRegister()
          if(this.isProx) {
            let obj = {
              "UserName": this.userName,
              "Email": this.email,
              "PasswordHash": this.senha,
              "Genero": Number(this.genero),
              "DataAniversario": this.dataAniversario
            };
            this.$emit("cadastrar", obj);
          }
          else {
            var hasEmail =  await this.hasEmail();
            this.$emit("setLoading", false);
            if(hasEmail) throw "Email já cadastrado!!";
            else this.isProx = true;
          }
        } else {
          if(this.isValidEmail && this.isPasswordValidLength) this.$emit("entrar", this.email, this.senha);
        }
      } catch(err) {
        this.addError(err);
        this.$emit("setLoading", false);
      }
    },
    
    /** Metodos para verificações para código limpo e limpeza nos dados */
    async hasEmail() {
      return await UsuarioServices.hasEmail(this.email);
    },

    async redefinicaoSenha() {
      this.clearErrors();
      var hasEmail = await this.hasEmail();
      if(hasEmail) this.$emit("RedefinirSenha", this.email);
      else this.addError("Email não inserido!!");
    },

    addError(message) {
      this.$emit('setMessageError', message);
      this.isError = true;
      if(this.isCadastro) this.isProx = false;
      this.$emit("setLoading", false);
    },

    addSuccess(message) {
      this.$emit("setMensagemSucesso", message);
      this.isError = false;
      this.$emit("setLoading", false);
    },
    hasDataRegister() {
      if((!this.email || !this.senha || !this.senhaConfirmada) && !this.isProx) throw "Preencha os campos para prosseguir!";
    },
    isValidsRegister() {
      if (!this.isPasswordValidLength) throw "Insira no mínimo 6 digitos na senha!";
      if (!this.isPasswordConfirmed) throw "Senha de confirmação não é igual!";
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