<template>
  <div class="container-fluid custom-checkout">
    <div class="formas-pagamentos">
      <tabela-forma-pagamento @formSelected="formPaymentAdd"></tabela-forma-pagamento>
    </div>
    <div class="custom-formulario-checkout h-50 w-100">
      <div class="row">
        <div class="col">
          <input-default :maxLength="11" v-model:data="cpf" :isDisabled="formPaymentId == null" id="cpf" name="CPF" placeholder="Informe seu CPF" label="CPF"></input-default>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <input-default v-model:data="fullName" :isDisabled="formPaymentId == null" id="fullName" name="FullName" placeholder="Informe seu nome completo" label="Nome Completo"></input-default>
        </div>
      </div>
      <div class="row" v-if="[1, 2].includes(formPaymentId)">
        <div class="col-sm-4">
          <input-default :maxLength="7" v-model:data="expirationDate" id="expirationDate" name="ExpirationDate" placeholder="12/2000" label="Data de validade"></input-default>
        </div>
        <div class="col-sm-6">
          <input-default :maxLength="16" v-model:data="numberCard" id="numberCard" name="NumberCard" placeholder="xxxx-xxxx-xxxx-xxxx" label="Número do cartão"></input-default>
        </div>
        <div class="col-sm-2">
          <input-default :maxLength="3" v-model:data="cvc" id="cvc" name="CVC" placeholder="111" label="CVC"></input-default>
        </div>
      </div>
      <hr/>
      <div class="row m-3">
        <h3 class="my-2">R$ {{ getValuePaymentTotal }}</h3>
        <div class="custom-items">
          <div v-for="cartDetail in cartDetails" :key="cartDetail?.ticketId" class="d-flex justify-content-between py-2 border-top">
            <span class="text-start">{{ cartDetail?.ticket.name }}</span>
            <h5>R$ {{ cartDetail?.ticket.price.toFixed(2) }}</h5>
          </div>
        </div>
        <button :disabled="isDisabled" @click="Checkout" class="btn btn-success p-2">
          <font-awesome-icon :icon="['fas', 'lock']" /> 
          Realizar Pagamento
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TabelaFormaPagamento from '@/components/Tabelas/TabelaFormaPagamento.vue';
import inputDefault from '@/components/inputs/inputDefault.vue';
import CartServices from '@/services/CartServices';

export default {
  name: 'CheckoutView',
  data() {
    return {
      formPaymentId: null,
      cpf: null,
      fullName: null,
      expirationDate: null,
      numberCard: null,
      cvc: null,
    }
  },
  watch: {
    cpf() {
      var num = this.cpf.replaceAll(/[^\d]/g, '');
      this.cpf = num;
      if (this.cpf.length == 11) {
        this.cpf = num.replaceAll(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
      }
      if (this.cpf.length < 14) {
        this.cpf = num.replaceAll(".", "");
        this.cpf = num.replaceAll("-", "");
      }
      console.log(this.cpf)
    },
    expirationDate() {
      this.expirationDate = this.expirationDate.replace(/\D/g, "");

      // Adiciona as barras automaticamente
      if (this.expirationDate.length > 2) {
        this.expirationDate = this.expirationDate.slice(0, 2) + "/" + this.expirationDate.slice(2);
      }
    },
    numberCard() {
      this.numberCard = this.numberCard.replace(/\D/g, "");

      if (this.numberCard?.length == 16) {
        this.numberCard = this.numberCard.replaceAll(/(\d{4})(\d{4})(\d{4})(\d{4})/g, "$1-$2-$3-$4")
      }
    },
    cvc() {
      this.cvc = this.cvc.replace(/\D/g, "");
    }
  },
  props: {
    itens: null,
    //valuePayment: Number,
    cartDetails: Array
  },
  computed: {
    isDisabled() {
      return (this.cpf?.match(/(\d{3})[.?](\d{3})[.?](\d{3})[-?](\d{2})/g) == null 
        || !this.fullName 
        || (!this.expirationDate || this.expirationDate?.length < 7) 
        || !this.numberCard?.match(/(\d{4})[-?](\d{4})[-?](\d{4})[-?](\d{4})/g)
        || (!this.cvc || this.cvc?.length < 3));
    },
    getValuePaymentTotal() {
      var initialValue = 0;
      var sumPrices = this.cartDetails?.reduce((accumulator, currentValue) => 
      accumulator + Number.parseFloat(currentValue?.ticket?.price ?? currentValue?.product?.price), 
      initialValue);
      
      return Number.parseFloat(sumPrices).toFixed(2);
    },
    getCountTotal() {
      var initialValue = 0;
      var sumQuantities = this.cartDetails?.reduce((accumulator, currentValue) => 
        accumulator + Number.parseInt(currentValue?.count),
        initialValue);
      
      return Number.parseInt(sumQuantities);
    },
  },
  components: {
    TabelaFormaPagamento,
    inputDefault
  },
  methods: {
    async Checkout() {
      console.log(this.cartDetails)
      let obj = {
        userId: this.cartDetails[0]?.cartHeader?.userId,
        purchaseAmount: this.getValuePaymentTotal,
        discountAmount: 0,
        fullName: this.fullName,
        email: "mauricio2017rubiale@gmail.com",
        cardNumber: this.numberCard,
        expirationDate: this.expirationDate,
        cvc: this.cvc,
        CartTotalItens: this.getCountTotal
      }
      CartServices.Checkout(obj);
    },
    formPaymentAdd(item) {
      this.formPaymentId = item?.id;
    },
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.custom-checkout {
  height: 100vh;
  padding: 80px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  grid-template-areas: 
  "form-payment        formulary"
  "form-payment        formulary"
  "footer              footer"
}

.formas-pagamentos {
  grid-area: form-payment;
  width: 100%;
  padding: 15px;
  font-size: 40px;
}

.custom-formulario-checkout {
  grid-area: formulary;
  padding: 15px;
  height: auto;
}

.custom-finalization-checkout {
  grid-area: finalization;
}

.custom-items {
  overflow: hidden;
  overflow-y: auto;
  height: 190px;
}

.custom-items::-webkit-scrollbar {
  width: 12px;
}

.custom-items::-webkit-scrollbar-track {
  background: var(--bs-gray-200);       /* color of the tracking area */
}

.custom-items::-webkit-scrollbar-thumb {
  background-color: var(--bs-gray-500);     /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid var(--bs-gray-200);    /* creates padding around scroll thumb */
}

.custom-items::-webkit-scrollbar-thumb:hover {
  background-color: var(--bs-gray-600);
}

@media (max-width: 1000px) {
  .custom-checkout {
    height: 100% !important;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: 
    "form-payment"
    "formulary"
    "footer"
  }
}
</style>