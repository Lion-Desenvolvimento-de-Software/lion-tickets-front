<template>
  <div class="home">
    <carousel class="banner" />
    <leyaout-cards class="main" :itens="getTickets">
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
  props: {
    usuario: Object
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
<style scoped>
.home {
  display: grid;
  grid-template-rows: 60px auto 1fr auto 50px;
  grid-template-columns: 1fr 4fr 1fr;
  height: 100%;
  grid-template-areas: 
    "header       header        header"
    "banner       banner        banner"
    "main         main          main"
    "main         main          main"
    "footer       footer        footer";
  grid-gap: 10px;
  padding: 10px;
  font-weight: 600;
  font-size: 20px;
}
.banner {
  grid-area: banner;
}

.main {
  grid-area: main;
}
</style>

