<template>
  <div class="home">
    <carousel />
    <leyaout-cards :itens="getTickets">
      <template v-slot:botaoDetalhes="{ item }">
        <RouterLink aria-disabled="true"
          :to="{ name: 'Eventos', params: { id: item.id } }">
          Detalhes
        </RouterLink>
      </template>
    </leyaout-cards>
  </div>
</template>

<script>
import Carousel from '@/components/carousel.vue';
import LeyaoutCards from '@/components/leyaoutCards.vue';

/// Services
import TicketServices from '@/services/TicketServices';

export default {
  name: 'HomeView',
  data() {
    return {
      tickets: []
    }
  },
  components: {
    Carousel,
    LeyaoutCards
  },
  created() {
    this.getTicketsAsync();
  },
  computed: {
    getTickets() {
      return this.tickets;
    }
  },
  methods: {
    async getTicketsAsync() {
      this.$emit("setLoading", true);
      try {
        this.tickets = await TicketServices.GetAllTicketsAsync();
      } catch(err) {
        console.log(err);
      } finally {
        this.$emit("setLoading", false);
      }
    }
  }
}
</script>
