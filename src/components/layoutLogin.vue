<template>
  <div class="custom-title">
    <font-awesome-icon :icon="['fas', 'user']" />
  </div>
  <div class="custom-form">
    <div class="custom-input">
      <input id="email" type="text" name="Email" required />
      <label for="email">Email</label>
      <font-awesome-icon :icon="['fas', 'envelope']" />
    </div>
    <div class="custom-input">
      <input id="senha" :type="!senhaVisivel ? 'password' : 'text'" name="Senha" required toggle-show="false" />
      <label for="senha">Senha</label>
      <font-awesome-icon class="icon" :icon="['fas', !senhaVisivel ? 'lock' : 'lock-open']" @click="senhaVisivel = !senhaVisivel" />
    </div>
  </div>
  <div class="custom-redefinir-senha">
    <p>Esqueceu a senha? <a href="">Redefinir</a></p>
  </div>
  <button class="custom-button">Entrar</button>
</template>

<script>

export default {
  name: "LayoutLogin",
  data() {
    return {
      senhaVisivel: false
    }
  }
}
</script>

<style>
input::-ms-reveal,
input::-ms-clear {
  display: none;
}
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
  height: 25%;
  flex-direction: column;
  align-items: center;
}
.custom-form .custom-input {
  position: relative;
  margin: 30px 0;
  max-width: 310px;
}
.custom-input input {
  background: transparent !important;
  border: 0;
  border-bottom: 2px solid #fff;
  width: 250px;
  height: 35px;
  padding: 0 2.5rem 0 0.5rem;
  color: #fff;
}
input:focus {
  outline: none;
}
.custom-input label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.5s ease-in-out;
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px #6ff9d3 inset;
}
input:-webkit-autofill ~ label,
input:focus ~ label,
input:valid ~ label {
  top: -5px;
}

.custom-input svg {
  position: absolute;
  font-size: 1.2rem;
  right: 0;
  top: 0.5rem;
  margin: 0 0.5rem;
}

.custom-input .icon {
  cursor: pointer;
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