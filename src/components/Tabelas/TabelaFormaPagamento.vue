<template>
  <div class="custom-forma-pagamento">
    <div v-for="item in itens" :key="item.id" :id="item.id" @click="selection(item)">
      <font-awesome-icon :icon="[item.typeIcon, item.icon]" class="icon" /> 
      <h3 class="title">{{ item.title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabelaFormaPagamento',
  emits: ['formSelected'],
  data() {
    return {
      itens: [
        {
          id: 1,
          title: 'Cartão de Crédito',
          class: 'card-credit',
          icon: 'credit-card',
          typeIcon: 'fas'
        },
        {
          id: 2,
          title: 'Cartão de Débito',
          class: 'card-debit',
          icon: 'credit-card',
          typeIcon: 'fas'
        },
        {
          id: 3,
          title: 'Boleto',
          class: 'boleto',
          icon: 'barcode',
          typeIcon: 'fas'
        },
        {
          id: 4,
          title: 'PIX',
          class: 'pix',
          icon: 'pix',
          typeIcon: 'fab',
        }
      ]
    }
  },
  methods: {
    selection(item) {
      var elementSelected = document.getElementsByClassName('selected');
      if (elementSelected.length > 0) document.getElementsByClassName('selected')[0].classList.remove('selected');
      document.getElementById(item.id).classList = 'selected';
      this.$emit('formSelected', item);
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