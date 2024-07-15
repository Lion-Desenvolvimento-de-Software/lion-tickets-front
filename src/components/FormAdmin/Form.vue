<template>
  <div class="container">
    <div class="custom-form mx-5 p-4">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Form',
  emits: ['salvar'],
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
      this.$emit('salvar');
    },

    cancelar() {
      this.$router.back();
    },
  }
}
</script>

<style scoped>
.custom-form {
  display: grid;
  row-gap: 15px;
  justify-content: center;
}
</style>