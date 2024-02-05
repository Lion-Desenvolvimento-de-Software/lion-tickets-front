<template>
  <div class="home">
    <carousel />
    <leyaout-cards nome="teste">
      <template v-slot:botaoDetalhes>
        <RouterLink aria-disabled="true"
          :to="{ name: 'Eventos', params: { id: 'teste' } }">
          Detalhes
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
  data() {
    return {
      loadingPage: false
    }
  },
  components: {
    Carousel,
    LeyaoutCards
  }
}
</script>
