<template>
  <div class="container-fluid custom-checkout">
    <div class="formas-pagamentos">
      <tabela-forma-pagamento @formSelected="formPaymentAdd"></tabela-forma-pagamento>
      {{ isDisabled }}
    </div>
    <div class="custom-formulario-checkout h-50 w-100">
      <div class="row">
        <div class="col">
          <input-default :maxLength="11" v-model:data="cpf" :isDisabled="formPaymentId == null" id="cpf" name="CPF" placeholder="Informe seu CPF" label="CPF"></input-default>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <input-default v-model="fullName" :isDisabled="formPaymentId == null" id="fullName" name="FullName" placeholder="Informe seu nome completo" label="Nome Completo"></input-default>
        </div>
      </div>
      <div class="row" v-if="[1, 2].includes(formPaymentId)">
        <div class="col-sm-4">
          <input-default v-model:data="expirationDate" id="expirationDate" name="ExpirationDate" placeholder="12/2000" label="Data de validade"></input-default>
        </div>
        <div class="col-sm-6">
          <input-default v-model:data="numberCard" id="numberCard" name="NumberCard" placeholder="xxxx-xxxx-xxxx-xxxx" label="Número do cartão"></input-default>
        </div>
        <div class="col-sm-2">
          <input-default v-model:data="cvc" id="cvc" name="CVC" placeholder="111" label="CVC"></input-default>
        </div>
      </div>
      <hr/>
      <div class="row m-3">
        <h3 class="my-2">R$ {{ $route.query.valuePayment }}</h3>
        <div class="custom-items">
          <div v-for="ticket in JSON.parse($route.query.tickets)" :key="ticket" class="d-flex justify-content-between py-2 border-top">
            <span class="text-start">{{ ticket.name }}</span>
            <h5>R$ {{ ticket.price.toFixed(2) }}</h5>
          </div>
        </div>
        <button :disabled="isDisabled" @click="console.log(valuePayment)" class="btn btn-success p-2">
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
    }
  },
  props: {
    itens: null,
    valuePayment: Number,
  },
  created() {
    console.log(this.tickets) // Verifica se o id está chegando
  },
  computed: {
    isDisabled() {
      return this.cpf?.match(/(\d{3})[.?](\d{3})[.?](\d{3})[-?](\d{2})/g) == null;
    }
  },
  components: {
    TabelaFormaPagamento,
    inputDefault
  },
  methods: {
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