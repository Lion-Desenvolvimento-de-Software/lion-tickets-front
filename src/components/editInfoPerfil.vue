<template>
  <div class="m-4 justify-content-grid custom-form">
    <div class="d-flex align-items-center">
      <font-awesome-icon class="custom-icons" :icon="['fas', 'mobile-screen']" id="telefone" />
      <input id="telefone" placeholder="(__) _____-____" type="text" name="telefone" :value="telefone" aria-describedby="telefone" />
    </div>
    <div class="d-flex align-items-center">
      <font-awesome-icon class="custom-icons" :icon="['fas', 'calendar-days']" id="telefone" />
      <input type="date" name="dataAniversario" :value="telefone" />
    </div>
    <div class="d-flex align-items-center">
      <font-awesome-icon class="custom-icons" :icon="['fas', 'venus-mars']" id="telefone" />
      <select name="genero">
        <option :value="null">Selecione...</option>
        <option value="1">Masculino</option>
        <option value="2">Feminino</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditInfoPerfil',
  props: {
    telefone: String
  }
}
</script>

<style scoped>
.custom-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  align-items: center;
}
.custom-form .custom-icons {
  position: absolute;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  border-right: 1px solid;
}
.custom-form > div {
  position: relative;
}
.custom-form input, select {
  width: 100%;
  height: 35px;
  border-radius: 25px;
  border: 1px solid #000;
  padding-left: 2.5em;
  padding-right: 0.5em;
}

@media only screen and (max-width: 450px) {
  .custom-form {
    display: flex !important;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>