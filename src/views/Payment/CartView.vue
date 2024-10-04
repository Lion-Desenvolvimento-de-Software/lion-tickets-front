<template>
  <div class="container-fluid custom-page">
    <div class="custom-title">
      <h1>Carrinho</h1>
    </div>
    <div class="custom-cart">
      <table>
        <tbody>
          <tr v-for="cartDetail in cart?.cartDetails" :key="cartDetail.id" class="custom-items">
            <div class="item-cart-detail">
              <div class="custom-image">
                <img :src="cartDetail.ticket?.imageURL ?? cartDetail.product?.imageURL" width="150" height="150">
              </div>
              <div class="layout-item">
                <div class="custom-detail">
                  <b><p>{{ cartDetail.ticket?.name ?? cartDetail.product?.name }}</p></b>
                  <div class="custom-classification">
                    <font-awesome-icon :icon="['far', 'star']" />
                    <font-awesome-icon :icon="['far', 'star']" />
                    <font-awesome-icon :icon="['far', 'star']" />
                    <font-awesome-icon :icon="['far', 'star']" />
                    <font-awesome-icon :icon="['far', 'star']" />
                    <span> ({{ 0 }} Classificações)</span>
                  </div>
                </div>
                <div class="custom-actions">
                  <button class="border-0 bg-transparent text-primary" @click="deleteCartDetail(cartDetail.id)">Remover</button>
                  <button class="border-0 bg-transparent text-primary">Pagar</button>
                  <button class="border-0 bg-transparent text-primary">Abrir</button>
                  <!-- <button class="border-0 bg-transparent text-primary">Desejos+</button> -->
                </div>
              </div>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="right-order-cart">
      <div class="custom-order-infos">
        <div class="info">
          <b>Total:</b>
          <h4>R$ {{ getValuePaymentTotal ?? Number.parseFloat("0").toFixed(2) }}</h4>
        </div>
        <div class="coupon">
          <span class="text-dark">Cupom: 
            <a href="">Adicionar</a>
          </span>
        </div>
      </div>
      <div class="custom-order-events">
        <button class="btn btn-success" :disabled="getValuePaymentTotal <= 0 ? true : false">Finalizar Compra</button>
      </div>
    </div>
    <toast-personalizado style="z-index: 700;"></toast-personalizado>
  </div>
</template>

<script>
import CartServices from '@/services/CartServices';
import toastPersonalizado from '@/components/toasts/toastPersonalizado.vue';

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
      cart: null,
      itemsSelected: 0
    }
  },
  props: {
    usuario: null,
    // cartDetail: {
    //   type: Array,
    //   default: () => [{ id: 1, name: 'Alok', price: 'R$ 29.90', description: 'Show do alok na expo Bauru' }]
    // }
  },
  components: {
    toastPersonalizado
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
        accumulator + Number.parseFloat(currentValue?.ticket?.price ?? currentValue?.product?.price), 
      initialValue);

      return Number.parseFloat(sumPrices).toFixed(2);
    },
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
    async deleteCartDetail(cartDetailId) {
      var isDeleted = await CartServices.DeleteCartDetail(cartDetailId);
      if (isDeleted) {
        var index = this.cart.cartDetails.findIndex(item => item.id == cartDetailId);
        this.cart.cartDetails.splice(index, 1);
      }
    }
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

.custom-cart {
  grid-area: cart;
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
}

.custom-cart table {
  width: 100%;
}

.custom-items {
  display: flex;
  flex-direction: row;
  padding: 5px;
  border: none;
  border-top: 1px solid #000;
}

.item-cart-detail {
  display: flex;
  height: 150px;
  width: 100%;
  flex-direction: row;
  gap: 15px;
}

.item-cart-detail .layout-item {
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-items: stretch;
  width: 100%;
}

.item-cart-detail .layout-item .custom-detail {
  display: block;
  height: 100%;
  width: 100%;
  text-align: start;
}

.custom-detail .custom-classification {
  font-size: 12px;
}

.custom-detail .custom-classification svg {
  color: rgb(133, 133, 0);
}

.item-cart-detail .layout-item .custom-actions {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: end;
}

  .item-cart-detail .layout-item .custom-actions button {
    padding: 0;
    border-bottom: 1px solid blue !important;
    margin: 5px 0;
  }

  .item-cart-detail .layout-item .custom-actions button:hover {
    padding: 0;
    color: rgba(0, 0, 255, 0.6) !important;
    border-bottom: 1px solid rgba(0, 0, 255, 0.6) !important;
  }

.right-order-cart {
  grid-area: info-order-cart;
  width: 180px;
  height: 150px;
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

.info select {
  height: 25px;
  border: none;
  border-bottom: 2px solid #000;
  padding: 0 5px;
  margin: 10px 0;
}

  .info select:focus {
    border-bottom: 2px solid rgba(0, 21, 255, 0.5);
    outline: none;
  }

.coupon {
  margin: 10px 0;
  font-size: 16px;
}

@media(max-width: 730px) {
  .custom-actions {
    align-items: start !important;
  }

  .item-cart-detail .layout-item {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: start;
    width: 100%;
  }
}

@media(max-width: 635px) {
  .custom-page {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: 
      "header"
      "info-order-cart"
      "cart"
      "footer";
    gap: 15px;
  }

  .right-order-cart {
    height: auto;
    width: 100%;
    display: block;
  }

  .custom-detail .custom-classification span {
    font-size: 12px;
  }
}
</style>