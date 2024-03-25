<template>
  <div class="container custom-eventos">
    <div class="w-100 d-flex justify-content-center">
      <h1>Eventos</h1>
    </div>
    <leyaout-cards nome="teste" class="custom-layout-cards">
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

<style scoped>
.custom-eventos {
  padding-top: 4.5rem;
}
</style>