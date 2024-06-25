<template>
  <div class="bg-secondary bg-gradient">
    <div class="container heigth-100-vh">
      <div class="layout-login">
        <div class="custom-forms">
          <font-awesome-icon class="custom-icon-user" :icon="['fas', getIconUser]" id="genero" />
          <div class="custom-input-username">
            <input type="text" v-model="username" id="username" required>
            <label for="username">Username</label>
          </div>
          <div class="custom-input-password">
            <input type="password" v-model="password" id="password" required>
            <label for="password">Password</label>
          </div>
          <button class="btn btn-success w-50" @click="logar">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginService from '@/services/admin/loginService';

export default {
  name: "loginAdmin",
  emits: ['update:username'],
  data: () => {
    return {
      iconUser: "",
      username: "",
      password: "",
    }
  },

  created() {
    this.iconUser = "user";
  },

  computed: {
    getIconUser() {
      return this.iconUser;
    }
  },

  methods: {
    async logar() {
      await loginService.loginAsync(this.username, this.password);
      this.$router.push('/admin');
    }
  }
}
</script>

<style scoped>
.heigth-100-vh {
  height: 100vh;
}

.layout-login {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-forms {
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 25px;
  max-height: 500px;
  height: auto;
  padding: 35px 75px;
  box-shadow: 10px 10px 11px 5px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  border-radius: 20px;
  align-items: center;
}

input {
  border: 0;
  border-bottom: 2px solid #000;
  background: none;
  height: 40px;
}

input:focus {
  outline: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 500000s ease-in-out 0s;
    -webkit-text-fill-color: #000 !important;
}

  input:-webkit-autofill ~ label,
  input:focus ~ label,
  input:valid ~ label {
    top: -5px;
  }

.custom-input-username {
  position: relative;
}

.custom-input-password {
  position: relative;
}

label {
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.5s ease-in-out;
}

.custom-icon-user {
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
}

@media only screen and (max-width: 380px) {
  .custom-forms {
    padding: 35px 35px;
  }
}
</style>