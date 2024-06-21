<template>
  <div class="container">
    <div class="custom-form mx-5 p-4">
      <div class="row">
        <div class="col d-flex custom-input">
          <label>Nome da empresa:</label>
          <input type="text" name="NomeEmpresa" autofocus />
        </div>
        <div class="col d-flex custom-input">
          <label>CNPJ:</label>
          <input type="text" name="NomeEmpresa" />
        </div>
      </div>
      <div class="row">
        <div class="col d-flex custom-input">
          <label>Descrição:</label>
          <textarea name="descricao"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex custom-button">
          <button class="btn btn-success">
            Salvar
          </button>
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

.custom-input input, textarea {
  border-radius: 10px;
  border: 1px solid #000;
  padding: 2px 10px;
  width: 100%;
}

.custom-input label {
  padding: 0 5px;
}

.custom-input input:focus {
  outline: none;
}

.custom-button {
  width: 100%;
  justify-content: end;
  margin: 5px;
}
</style>