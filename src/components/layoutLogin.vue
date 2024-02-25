<template>
  <div class="custom-title">
    <font-awesome-icon :icon="['fas', 'user']" />
  </div>
  <div class="custom-form">
    <input-with-icon Id="email"
                    Type="text"
                    Label="Email"
                    :Required="true" />

    <input-with-icon Id="senha"
                    :Type="senhaVisivel ? 'text' : 'password'"
                    Label="Senha"
                    Name="Senha"
                    :Required="true"
                    ClassIcon="visionPassword"
                    :Icon="['fas',  senhaVisivel ? 'lock-open' : 'lock']"
                    @ViewPassword="senhaVisivel = !senhaVisivel" />
                    
    <input-with-icon Id="confirmarSenha"
                    :Type="senhaConfirmaVisivel ? 'text' : 'password'"
                    Label="Confirmar"
                    Name="Confirmar Senha"
                    :Required="true"
                    ClassIcon="visionPassword"
                    :Icon="['fas',  senhaConfirmaVisivel ? 'lock-open' : 'lock']"
                    @ViewPassword="senhaConfirmaVisivel = !senhaConfirmaVisivel"
                    v-if="isCadastro" />
  </div>
  <p>Esqueceu a senha? <a href="">Redefinir</a></p>
  <button class="custom-button">Entrar</button>
</template>

<script>
import inputWithIcon from './inputs/inputWithIcon.vue'

export default {
  name: "LayoutLogin",
  data() {
    return {
      senhaVisivel: false,
      senhaConfirmaVisivel: false
    }
  },
  props: {
    isCadastro: Boolean
  },
  components: {
    inputWithIcon
  },
  methods: {
    ViewPassword() {
      this.senhaVisivel = !this.senhaVisivel;
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
</style>