<template>
  <div class="custom-container">
    <div class="custom-layout-boxs">
      <div class="custom-button-troca">
        <button><font-awesome-icon :icon="['fas', 'arrows-rotate']" /></button>
      </div>
      <div class="custom-layout-left">
        <div class="custom-info">
          <h1>Bem Vindo</h1>
          <h3>Cadastre-se</h3>
          <p>Você pode clicando <a href="">aqui</a> ou no botão à direita.</p>
        </div>
      </div>
      <div class="custom-layout">
        <layout-login />
      </div>
    </div>
  </div>
</template>

<script>
import UsuarioServices from '@/assets/services/UsuarioServices';
import layoutLogin from '@/components/layoutLogin.vue';
export default {
    name: 'Login',
    data() {
        return {
            email: null,
            senha: null
          };
        },
    components: {
      layoutLogin
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
}
</script>

<style scoped>
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.custom-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/images/background/wallpaper-gif-4.gif');
  background-size: cover;
  background-position-y: 100%;
}

.custom-layout-boxs {
  display: grid;
  align-items: center;
  justify-items: center;
  justify-content: center;
  grid: auto-flow dense / 50% 50% 1fr;
}

.custom-layout-left {
  background: rgba(0, 0, 0, 0.2);
  width: 260px;
  height: 520px;
  color: #fff;
  box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.5);
}

.custom-layout {
  background: rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 520px;
  color: #fff;
  padding: 0 50px;
  box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.5);
}

a {
  color: aqua;
}

.custom-button-troca {
  position: absolute;
  margin: 0 75px 0 0;
}

.custom-button-troca button {
  border-radius: 50%;
  width: 75px;
  height: 75px;
  z-index: 150px;
  background: rgba(255, 255, 255, 0.5);
  border: 0;
  box-shadow: 0 0 5px 2px #000;
}

.custom-button-troca button:active {
  box-shadow: 0 0 5px 2px #000 inset;
}
.custom-button-troca button:hover {
  background: rgba(255, 255, 255, 0.75);
}
.custom-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
}

.custom-info p, h3 {
  margin: 2rem 0;
}
</style>
