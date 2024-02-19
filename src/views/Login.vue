<template>
  <div class="custom-container">
    <div class="custom-layout">
      <div class="custom-title">
        <FontAwesomeIcon :icon="['fas', 'user']" />
      </div>
      <div class="custom-form">
        <div class="custom-input">
          <input id="email" type="text" name="Email" required />
          <label for="email">Email</label>
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </div>
        <div class="custom-input">
          <input id="senha" type="password" name="Senha" required toggle-show="false" />
          <label for="senha">Senha</label>
          <font-awesome-icon :icon="['fas', 'lock']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsuarioServices from '@/assets/services/UsuarioServices';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
    name: 'Login',
    data() {
        return {
            email: null,
            senha: null
        };
    },
    computed: {
        isValidEmail() {
            var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if (this.email == null)
                return false;
            return this.email.match(pattern);
        },
        isPasswordValidLength() {
            if (this.senha == null)
                return false;
            return this.senha.length > 5;
        },
    },
    methods: {
        async Logar() {
            let obj = {
                "User": this.email,
                "Password": this.senha,
                "RememberMe": false
            };
            UsuarioServices.login(obj).then(() => {
                window.location.pathname = '/';
            }).catch(err => {
                console.log(err);
            });
        }
    },
    components: { FontAwesomeIcon }
}
</script>

<style scoped>
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
input::-ms-reveal,
input::-ms-clear {
  display: none;
}
.custom-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.custom-layout {
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 360px;
  height: 520px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
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
  border-bottom: 2px solid black;
  width: 250px;
  height: 35px;
  padding: 0 2.5rem 0 0.5rem;
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
</style>
