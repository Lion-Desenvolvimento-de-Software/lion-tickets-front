<template>
  <div class="m-4 d-grid justify-content-grid custom-form">
    <input class="item1" type="text" name="telefone" :value="telefone" />
    <input class="item2" type="text" name="telefone" :value="telefone" />
    <input class="item3" type="text" name="telefone" :value="telefone" />
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
}
.custom-form input {
  border-radius: 25px;
  border: 1px solid #000;
  width: auto;
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