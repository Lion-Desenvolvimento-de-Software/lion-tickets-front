<template>
  <div class="container-fluid custom-checkout">
    <div class="formas-pagamentos">
      <tabela-forma-pagamento @formSelected="formPaymentAdd"></tabela-forma-pagamento>
    </div>
    <div class="custom-formulario-checkout h-50 w-100" v-if="formPaymentId">
      <div class="row">
        <div class="col">
          <input-default id="cpf" name="CPF" placeholder="Informe seu CPF" label="CPF"></input-default>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <input-default id="fullName" name="FullName" placeholder="Informe seu nome completo" label="Nome Completo"></input-default>
        </div>
      </div>
      <div class="row" v-if="[1, 2].includes(formPaymentId)">
        <div class="col-4">
          <input-default id="expirationDate" name="ExpirationDate" placeholder="01/01/2000" label="Data de validade"></input-default>
        </div>
        <div class="col-6">
          <input-default id="numberCard" name="NumberCard" placeholder="xxxx-xxxx-xxxx-xxxx" label="Número do cartão"></input-default>
        </div>
        <div class="col-2">
          <input-default id="cvv" name="CVV" placeholder="111" label="CVV"></input-default>
        </div>
      </div>
    </div>
    <div class="custom-finalization-checkout">
      <h3>R$ </h3>
      <button class="btn btn-success p-2">
        <font-awesome-icon :icon="['fas', 'lock']" /> 
        Realizar Pagamento
      </button>
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
      formPaymentId: null
    }
  },
  props: {
    itens: null
  },
  components: {
    TabelaFormaPagamento,
    inputDefault
  },
  methods: {
    formPaymentAdd(item) {
      this.formPaymentId = item?.id;
    }
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
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  grid-template-areas: 
  "form-payment        formulary"
  "form-payment        formulary"
  "form-payment        finalization";
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
</style>