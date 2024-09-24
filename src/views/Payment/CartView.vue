<template>
  <div class="container custom-page">
    <div class="custom-title">
      <h1>Carrinho</h1>
    </div>
    <div class="custom-products">
      <b-table :fields="fields"
               :data="data"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartView",
  data() {
    return {
      fields: [
        { key: "image_product", label: "" },
        { key: "id", label: "ID" },
        { key: "name", label: "Nome" },
        { key: "price", label: "Preço" },
        { key: "description", label: "Descrição" }
      ]
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.custom-page {
  height: 100vh;
  padding-top: 80px;
}
</style>