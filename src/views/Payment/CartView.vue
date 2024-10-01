<template>
  <div class="container custom-page">
    <div class="custom-title">
      <h1>Carrinho</h1>
    </div>
    <div class="custom-table-cart">
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Ingressos" active>
          <b-table :fields="fields"
                  :items="getCartDetailsTickets"
                  striped
                  hover
                  fixed
                  class="cart">
            <template #cell(imageURL)="{ item }">
              <img :src="item?.imageURL" width="80">
            </template>
          </b-table>
        </b-tab>
        <b-tab title="Produtos">
          <b-table :fields="fields"
                  :items="null"
                  striped
                  hover
                  fixed
                  class="cart">
            <template #cell(imageURL)="{ item }">
              <img :src="item?.imageURL" width="80">
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
      
    </div>
  </div>
</template>

<script>
import CartServices from '@/services/CartServices';

export default {
  name: "CartView",
  data() {
    return {
      fields: [
        { key: "imageURL", label: "" },
        { key: "id", label: "ID" },
        { key: "name", label: "Nome" },
        { key: "price", label: "Preço" },
        { key: "category", label: "Categoria" },
      ],
      cart: null
    }
  },
  props: {
    usuario: null,
    // cartDetail: {
    //   type: Array,
    //   default: () => [{ id: 1, name: 'Alok', price: 'R$ 29.90', description: 'Show do alok na expo Bauru' }]
    // }
  },
  created() {
    this.getCartByUserId(this.usuario.Id);
  },
  computed: {
    getCartDetailsTickets() {
      return this.cart?.cartDetails.map(value => { return value?.ticket ?? null }) ?? null;
    },
    getCartDetailsProducts() {
      return this.cart?.cartDetails.map(value => { return value?.product ?? null }) ?? null;
    }
  },
  methods: {
    async getCartByUserId(userId) {
      try {
        this.$emit('setLoading', true);
        this.cart = await CartServices.GetCartByUserId(userId);
      } catch (err) {
        console.log(err);
      } finally {
        this.$emit('setLoading', false);
      }
    },
  }
}
</script>

<style scoped>
.custom-page {
  height: 100vh;
  padding-top: 80px;
}

.custom-table-cart {
  height: 480px;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, .25);
}

.custom-table-cart .cart {
  margin: 0;
  height: 100%;
}
</style>