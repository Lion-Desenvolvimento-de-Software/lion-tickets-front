<template>
  <div class="m-4 justify-content-grid custom-form">
    <div class="d-flex align-items-center">
      <span id="telefone">T</span>
      <input id="telefone" type="text" name="telefone" :value="telefone" aria-describedby="telefone" />
    </div>
    <div class="d-flex align-items-center">
      <span id="telefone">T</span>
      <input type="date" name="telefone" :value="telefone" />
    </div>
    <div class="d-flex align-items-center">
      <span id="telefone">T</span>
      <select type="text" name="telefone">
        <option :value="null">Selecione...</option>
        <option value="">Masculino</option>
        <option value="">Feminino</option>
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
.custom-form span {
  position: absolute;
  padding-left: 0.8em;
  padding-right: 0.8em;
  top: 1px;
  bottom: 1px;
  border-right: 1px solid;
}
.custom-form > div {
  position: relative;
}
.custom-form input, select {
  width: 100%;
  height: 26px;
  border-radius: 25px;
  border: 1px solid #000;
  padding-left: 2.5em;
  padding-right: 0.5em;
}

.custom-form input:hover {
  
}

@media only screen and (max-width: 450px) {
  .custom-form {
    display: flex !important;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>