<template>
  <div class="home">
    <carousel />
    <leyaout-cards nome="teste">
      <template v-slot:botaoDetalhes>
        <RouterLink :to="{ name: 'Eventos', params: { id: 'teste' } }">
          <button class="btn btn-primary">
            Detalhes
          </button>
        </RouterLink>
      </template>
    </leyaout-cards>
  </div>
</template>

<script>
import Carousel from '@/components/carousel.vue'
import LeyaoutCards from '@/components/leyaoutCards.vue'

export default {
  name: 'HomeView',
  components: {
    Carousel,
    LeyaoutCards
  }
}
</script>
