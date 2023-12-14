<template>
  <div class="home">
    <carousel />
    <leyaout-cards />
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
