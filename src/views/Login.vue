<template>
  <div class="bg-primary py-2 d-flex justify-content-center limited-h">
    <div class="shadow-lg container bg-body rounded py-4 w-500">
      <div class="my-4">
        <img src="../assets/images/R.png" height="75" width="75" />
      </div>
      <div id="title" class="my-4">
        <h1>Login</h1>
      </div>
      <div class="row g-3 justify-content-center mx-2">
        <div class="col-md-8">
          <label for="email" class="form-label d-flex px-0 label-spacing">Email:</label>
          <input id="email"
            type="text"
            name="Email"
            placeholder="Insira o seu email..." 
            v-model="email"
            class="form-control"
          />
        </div>
        <div class="col-md-8">
          <label for="senha" class="form-label d-flex px-0 label-spacing">Senha:</label>
          <input id="senha"
            type="password"
            name="Sena"
            placeholder="Insira a senha..." 
            v-model="senha"
            class="form-control"
          />
        </div>
        <div class="d-flex justify-content-center">
          <p class="size-font">Esqueceu a senha? <a href="/">clique aqui</a></p>
        </div>
        <div class="col-md-8 my-0">
          <div class="d-flex justify-content-center">
            <button class="border-0 rounded-circle m-3 bg-white">
              <img src="../assets/images/google-icon.png" width="35" height="35" alt="Login google" />
            </button>
            <button class="border-0 rounded-circle mx-3 bg-white">
              <img src="../assets/images/icon-face.png" width="35" height="35" alt="Login facebook" />
            </button>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button class="btn btn-primary btn-lg" @click="Logar" :disabled="!isValidEmail || !isPasswordValidLength">Entrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsuarioServices from '@/assets/services/UsuarioServices';
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      senha: null
    }
  },
  computed: {
    isValidEmail() {
      var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
      if (this.email == null) return false;
      return this.email.match(pattern);
    },
    isPasswordValidLength() {
      if (this.senha == null) return false;
      return this.senha.length > 5
    },
    
  },
  methods: {
    async Logar() {
      let obj = {
        "User": this.email,
        "Password": this.senha,
        "RememberMe": false
      }
      UsuarioServices.login(obj).then(() => {
        window.location.pathname = '/'
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
#app {
  background-color: gray;
}
.size-font {
  font-size: 11px;
}

.label-spacing {
  margin-bottom: 0;
}

.w-500 {
  width: 500px;
}

.limited-h {
  height: 100vh;
  max-height: 100vh;
}

.altura-form {
  height: 75vh;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
