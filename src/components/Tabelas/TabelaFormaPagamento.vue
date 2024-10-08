<template>
  <div class="custom-forma-pagamento">
    <div v-for="item in itens" :key="item.id" class="" :id="formasPagamento[item.id]" @click="selection(formasPagamento[item.id])">
      <font-awesome-icon :icon="[item.typeIcon, item.icon]" class="icon" /> 
      <h3 class="title">{{ item.title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabelaFormaPagamento',
  data() {
    return {
      formPaymentSelected: null,
      formasPagamento: { card_credit: 1, card_debit: 2, boleto: 3, pix: 4 },
      itens: [
        {
          id: 'card_credit',
          title: 'Cartão de Crédito',
          class: 'card-credit',
          icon: 'credit-card',
          typeIcon: 'fas'
        },
        {
          id: 'card_debit',
          title: 'Cartão de Débito',
          class: 'card-debit',
          icon: 'credit-card',
          typeIcon: 'fas'
        },
        {
          id: 'boleto',
          title: 'Boleto',
          class: 'boleto',
          icon: 'barcode',
          typeIcon: 'fas'
        },
        {
          id: 'pix',
          title: 'PIX',
          class: 'pix',
          icon: 'pix',
          typeIcon: 'fab'
        }
      ]
    }
  },
  methods: {
    selection(id) {
      var elementSelected = document.getElementsByClassName('selected');
      if (elementSelected.length > 0) document.getElementsByClassName('selected')[0].classList.remove('selected');
      document.getElementById(id).classList = 'selected';
    }
  }
}
</script>

<style scoped>
.custom-forma-pagamento {
  display: flex;
  flex-direction: column;
  border: 2px solid;
  box-shadow: 0 0 3px 1px rgba(217, 202, 202, 0.75) inset;
}

.custom-forma-pagamento > div {
  display: grid;
  grid-template-columns: 20px 1fr;
  padding: 15px;
  border: 1px solid;
  align-items: center;
  cursor: pointer;
  margin: 3px;
}

.custom-forma-pagamento .selected {
  background-color: rgb(0, 153, 255);
}

.custom-forma-pagamento > div .title {
  width: 100%;
}

.custom-forma-pagamento > div .icon {
  font-size: 60px;
}
</style>