<template>
  <div class="container">
    <div class="main" v-if="!$route.params.id">
      <div class="w-100 d-flex justify-content-center">
        <h1>Eventos</h1>
      </div>
      <leyaout-cards :itens="getTickets" class="custom-layout-cards">
        <template v-slot:botaoDetalhes="{ item }">
          <RouterLink :to="{ name: 'Eventos', params: { id: item.id } }">
            Detalhes
          </RouterLink>
        </template>
      </leyaout-cards>
    </div>
    <div class="d-grid container-ticket position-relative" v-else>
      <div class="custom-images-views left-images">
        <img :src="getTicketById?.imageURL" >
        <div class="custom-low-images">
          <img v-for="image in getTicketById?.files?.filter(value => value.type.includes('image'))" :key="image" :src="image.url" width="60" height="60">
        </div>
      </div>
      <div class="description">
        <p>{{ getTicketById?.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import leyaoutCards from '@/components/leyaoutCards.vue';
import TicketServices from '@/services/TicketServices';

export default {
  name: 'EventosView',
  data() {
    return {
      tickets: []
    }
  },
  components: {
    leyaoutCards
  },
  created() {
    this.getTicketsAsync();
  },
  computed: {
    getTickets() {
      return this.tickets;
    },
    getTicketById() {
      return this.tickets.find(value => value.id == this.$route.params.id);
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

.main {
  grid-area: main;
}

.description {
  grid-area: description;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-ticket {
  grid-template-rows: 80px auto 1fr auto 50px;
  grid-template-columns: 1fr 4fr 1fr;
  height: 100%;
  grid-template-areas: 
    "header       header        header"
    "left-images  description   description"
    "left-images  description   description"
    "footer       footer        footer";
  grid-gap: 10px;
}

.custom-images-views {
  grid-area: left-images;
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.custom-images-views .custom-low-images img {
  border: 2px solid #000;
}
</style>