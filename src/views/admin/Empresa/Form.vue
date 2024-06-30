<template>
  <div class="container">
    <div class="custom-form mx-5 p-4">
      <div class="row">
        <div class="col d-flex custom-input">
          <label>Nome da empresa:</label>
          <input v-model="nome" type="text" name="NomeEmpresa" placeholder="Insira o nome da empresa" autofocus />
        </div>
        <div class="col d-flex custom-input">
          <label>CNPJ:</label>
          <input v-model="cnpj" type="text" name="CNPJ" placeholder="99999999/0001-76" />
        </div>
      </div>
      <div class="row">
        <div class="col d-flex custom-input">
          <label>Descrição:</label>
          <textarea v-model="descricao" name="descricao"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex custom-button">
          <button class="btn btn-outline-secondary" @click="cancelar">Cancelar</button>
          <button class="btn btn-success" @click="salvarOrEditar">{{ $route.params.id == 'new' ? 'Salvar' : 'Editar' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Form',
  emits: ['salvarEmpresa'],
  data() {
    return {
      types: [
        { Id: 0, title: "Empresa" },
        { Id: 1, title: "Usuario" },
        { Id: 2, title: "Ticket" },
        { Id: 3, titile: "Produto" }
      ],
      nome: this.Nome,
      cnpj: this.Cnpj,
      descricao: this.Descricao
    }
  },
  props: {
    typeForm: {
      type: Number,
      default: 0
    },
    Nome: String,
    Cnpj: String,
    Descricao: String
  },
  created() {
    console.log(this.$route.params)
    if (this.$route.params.id == 'new') {
      this.nome = null,
      this.cnpj = null,
      this.descricao = null
    }
  },
  methods: {
    salvarOrEditar() {
      var obj = {
        "Id": this.$route.params.id == 'new' ? null : this.$route.params.id,
        "Nome": this.nome,
        "CNPJ": this.cnpj,
        "Descricao": this.descricao
      };
      this.$emit(this.$route.params.id == 'new' ? 'salvarEmpresa' : 'editarEmpresa', obj);
    },

    cancelar() {
      this.$router.back();
    }
  }
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
}

.custom-button button {
  margin: 0 5px;
}
</style>