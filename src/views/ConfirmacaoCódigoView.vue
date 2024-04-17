<template>
  <div class="custom-container">
    <div class="custom-layout">
      <div class="custom-infos">
        <div class="custom-details">
          <p>insira o código que enviamos pelo email.</p>
        </div>
        <div class="custom-form w-100">
          <input type="text" maxlength="6" v-model="value" @input="value = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />
          <button @click="ConfirmarCodigo">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmacaoCodigoView",
  emits: ['ConfirmarCodigo'],
  data() {
    return {
      value: ""
    }
  },
  methods: {
    ConfirmarCodigo() {
      this.$emit('ConfirmarCodigo', this.value);
    }
  }
}
</script>

<style scoped>
*::before,
*::after {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.custom-container {
  margin: 0 35px;
}

.custom-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.custom-infos {
  width: 400px;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
}

.custom-form {
  display: grid;
  justify-items: center;
  height: 120px;
  align-content: space-evenly;
}

.custom-form input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input {
  content: "";
  width: 50%;
  height: 40px;
  border-radius: 5px;
  margin: 0 5px;
  border: 1px solid #000;
  text-align: center;
  font-size: 18px;
}

input:focus {
  outline-color: rgb(1, 69, 163);
}

button {
  height: 40px;
  width: 100px;
  background-color: transparent;
  border: 2px solid green;
  border-radius: 50px;
  transition: background-color 100ms ease-in;
}

button:hover {
  color: #fff;
  box-shadow: 0 0 5px 1px #000;
  background-color: green;
}
button:active {
  box-shadow: 0 0 10px 1px #000 inset;
}
</style>