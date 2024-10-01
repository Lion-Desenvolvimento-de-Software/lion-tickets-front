<template>
  <div class="container custom-page">
    <div class="custom-title">
      <h1>Carrinho</h1>
      {{ getValuePaymentTotal }}
    </div>
    <div class="custom-table-cart">
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Ingressos" active>
          <b-table :fields="fields"
                  :items="getCartDetailsTickets"
                  striped
                  hover
                  fixed
                  tbody-tr-class="align-middle"
                  class="cart">
            <template #cell(imageURL)="{ item }">
              <img :src="item?.imageURL" width="80">
            </template>
            <template #cell(action)>
              <button class="btn btn-danger"><font-awesome-icon :icon="['fas', 'trash']" /></button>
            </template>
            <template #cell(price)="{ item }">
              <span>{{ Number.parseFloat(item.price).toFixed(2) }}</span>
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
            <template #cell(action)="{ item }">
              <button class="btn btn-danger fa-trash" @click="item"></button>
            </template>
            <template #cell(price)="{ item }">
              <span>{{ Number.parseFloat(item.price).toFixed(2) }}</span>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </div>
    <div class="right-order-cart">
      <div class="custom-order-infos">
        <h2>Pedido</h2>
        <div class="info">
          <h4></h4>
        </div>
        <div class="coupon">
          <button class="btn btn-outline-secondary text-dark">Coupon</button>
        </div>
      </div>
      <div class="custom-order-events">
        <button class="btn btn-success">Finalizar Compra</button>
      </div>
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
        { key: "action", label: "" },
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
    },
    getValuePaymentTotal() {
      var initialValue = 0;
      var sumPrices = this.cart?.cartDetails.reduce((accumulator, currentValue) => 
        (accumulator + Number.parseFloat(currentValue?.ticket?.price ?? currentValue?.product?.price)), initialValue);

      return Number.parseFloat(sumPrices).toFixed(2);
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
  display: grid;
  grid-template-rows: 80px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: 
    "header           header            header"
    "cart             cart              info-order-cart"
    "footer           footer            footer";
  gap: 15px;
}

.custom-title {
  grid-area: header;
}

.custom-table-cart {
  grid-area: cart;
  height: 480px;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, .25);
}

.custom-table-cart .cart {
  margin: 0;
  height: 100%;
}

.right-order-cart {
  grid-area: info-order-cart;
  width: 280px;
  height: 480px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, .25);
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}

.right-order-cart .custom-order-infos {
  text-align: start;
}

.right-order-cart .custom-order-events button {
  width: 100%;
}
</style>