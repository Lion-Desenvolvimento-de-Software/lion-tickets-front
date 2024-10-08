<template>
  <div class="container-fluid custom-checkout">
    <div class="formas-pagamentos">
      <tabela-forma-pagamento></tabela-forma-pagamento>
    </div>
    <div class="custom-info-checkout">
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

export default {
  name: 'CheckoutView',
  props: {
    itens: null
  },
  components: {
    TabelaFormaPagamento
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
}

.formas-pagamentos {
  width: 100%;
  padding: 15px;
  font-size: 40px;
}
</style>