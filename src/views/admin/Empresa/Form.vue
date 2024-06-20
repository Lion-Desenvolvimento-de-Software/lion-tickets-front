<template>
  <div class="container">
    <div class="custom-form mx-5 p-4">
      <div class="row">
        <div class="col d-flex custom-input">
          <lable>Nome da empresa</lable>
          <input type="text" name="NomeEmpresa" autofocus />
        </div>
        <div class="col d-flex custom-input">
          <lable>Nome da empresa</lable>
          <input type="text" name="NomeEmpresa" />
        </div>
      </div>
      <div class="row">
        <div class="col d-flex custom-input">
          <lable>Nome da empresa</lable>
          <input type="text" name="NomeEmpresa" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Form'
}
</script>

<style scoped>
.custom-form {
  display: grid;
  row-gap: 15px;
  justify-content: center;
}

.custom-input {
  flex-direction: column;
  align-items: flex-start;
}

.custom-input input {
  border-radius: 10px;
  border: 1px solid #000;
  padding: 2px 10px;
  width: 100%;
  text-align: center;
}

.custom-input input:focus {
  outline: none;
}
</style>