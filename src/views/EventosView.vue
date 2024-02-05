<template>
  <div class="d-flex container">
    <leyaout-cards nome="teste">
      <template v-slot:botaoDetalhes>
        <RouterLink :to="{ name: 'Eventos', params: { id: 'teste' } }">
          Detalhes
        </RouterLink>
      </template>
    </leyaout-cards>
  </div>
</template>

<script>
import leyaoutCards from '@/components/leyaoutCards.vue';
export default {
  name: 'EventosView',
  components: {
    leyaoutCards
  }
}
</script>