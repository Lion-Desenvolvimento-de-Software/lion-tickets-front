<template>
  <div class="custom-title">
    <font-awesome-icon :icon="['fas', 'user']" />
  </div>
  <div class="custom-form" :class="!isCadastro ? 'h-25' : 'h-50'">
    <div>
      <input-with-icon Id="email"
                      Type="text"
                      Label="Email"
                      :Required="true" />
    </div>
    <div class="custom-input">
      <input-with-icon Id="senha"
                      Type="password"
                      Label="Senha"
                      Name="Senha"
                      :Required="true"
                      ClassIcon="visionPassword"
                      :Icon="['fas',  senhaVisivel ? 'lock-open' : 'lock']"
                      @ViewPassword="ViewPassword"
                      ref="inputPassword" />
    </div>
    
  </div>
  <div class="custom-redefinir-senha">
    <p>Esqueceu a senha? <a href="">Redefinir</a></p>
  </div>
  <button class="custom-button">Entrar</button>
</template>

<script>
import inputWithIcon from './inputs/inputWithIcon.vue'

export default {
  name: "LayoutLogin",
  data() {
    return {
      senhaVisivel: false,
      isCadastro: false
    }
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
  margin: 2.5em 0;
}
.custom-title svg {
  font-size: 3rem;
}

.custom-form {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.custom-redefinir-senha {
  margin: 1rem 0;
}

a {
  color: aqua;
}

.custom-button {
  width: 100px;
  height: 2rem;
  color: #fff;
  background: none;
  border: 1px solid #fff;
  margin: 1rem 0;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
}
.custom-button:hover {
  background: rgba(0, 0, 0, 0.1);
}
.custom-button:active {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5) inset;
}
</style>