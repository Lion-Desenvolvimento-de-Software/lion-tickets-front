<template>
  <div class="container">
    <leyaout-cards nome="teste">
      <button class="btn btn-primary" to="/teste">
        <RouterLink :to="{ name: 'Produtos', params: { productsName: 'teste' } }">
          Detalhes
        </RouterLink>
      </button>
    </leyaout-cards>
  </div>
</template>

<script>
import leyaoutCards from '@/components/leyaoutCards.vue';
export default {
  name: 'Produtos',
  components: {
    leyaoutCards
  }
}
</script>