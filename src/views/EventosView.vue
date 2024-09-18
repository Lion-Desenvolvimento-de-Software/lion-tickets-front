<template>
  <div class="container my-5 py-4">
    <div v-if="!$route.params.id">
      <div class="w-100 d-flex justify-content-center banner">
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
        <img class="image-view" :src="getTicketById?.imageURL" >
        <div class="custom-low-images">
          <section ref="art1" id="sections">
            <img v-for="image in getTicketById?.files?.filter(value => value.type.includes('image'))" 
                :key="image" 
                :src="image.url"
                width="80" 
                height="80"
                :id="image.id"
                :class="image.id == imageAuxId ? 'selected' : ''"
                ref="imageAction"
                @click="viewImage(image)">
          </section>
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
      tickets: [],
      imageAuxId: ''
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
    },
  },
  methods: {
    async getTicketsAsync() {
      this.$emit("setLoading", true);
      try {
        this.tickets = await TicketServices.GetAllTicketsAsync();
        if (this.$route.params.id) {
          this.imageAuxId = this.tickets.find(value => value.id == this.$route.params.id).files[0].id;
        }
      } catch(err) {
        console.log(err);
      } finally {
        this.$emit("setLoading", false);
      }
    },
    viewImage(image) {
      this.tickets.find(value => value.id == this.$route.params.id).imageURL = image.url;
      this.selectImage(image);
    },
    selectImage(image) {
      this.tickets.find(value => value.id == this.$route.params.id).files.find(value => value.id == image.id)['classSelected'] = "selected";
      this.$refs['imageAction'].find(value => value.id == this.imageAuxId).classList = null;
      this.imageAuxId = image.id;
      this.$refs['imageAction'].find(value => value.id == image.id).classList = "selected";
    }
  }
}
</script>

<style scoped>
.banner {
  grid-area: banner;
}
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
    "banner       banner        banner"
    "left-images  description   description"
    "left-images  description   description"
    "footer       footer        footer";
  grid-gap: 10px;
  padding: 10px;
  font-weight: 600;
  font-size: 20px;
}

.custom-images-views {
  grid-area: left-images;
  display: flex;
  flex-direction: row;
}

.custom-images-views > img {
  width: 500px;
  height: 350px;
}

.custom-images-views .image-view {
  object-fit: contain;
}

.custom-images-views .custom-low-images {
  position: relative;
  width: 80px;
  display: flex;
  justify-content: center;
}

.custom-images-views .custom-low-images section {
  position: absolute;
  height: 350px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 3px;
}

  section::-webkit-scrollbar {
    width: 8px;
  }

  section::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }

  section::-webkit-scrollbar-thumb {
    background: rgb(77, 77, 77); 
    border-radius: 10px;
  }

  section::-webkit-scrollbar-thumb:hover {
    background: rgba(77, 77, 77, 0.5); 
  }

  .custom-images-views .custom-low-images section img {
    width: 60px;
    height: 60px;
    margin: 0 2px;
    cursor: pointer;
  }

    .custom-images-views .custom-low-images section img:hover {
      border: 3px solid rgb(77, 92, 251);
      box-shadow: -3px 0px 12px 0px rgb(77, 92, 251), 3px 0px 6px -2px rgb(77, 92, 251);
    }

    .custom-images-views .custom-low-images section img.selected {
      border: 3px solid rgb(77, 92, 251);
    }

.custom-low-images #arrow-top {
  position: absolute;
  width: 100%;
  height: 25px;
  top: 0;
}

.custom-images-views .custom-low-images #arrow-top::before {
  content: "\25B2";
  position: absolute;
  width: 100%;
  color: white;
  bottom: 0;
  left: 0;
  transition: 0.3s;
}
  .custom-images-views .custom-low-images #arrow-top:hover::before {
    background-color: rgba(999, 999, 999, 0.25);
    cursor: pointer;
  }

.custom-low-images #arrow-bottom {
  position: absolute;
  width: 100%;
  height: 25px;
  bottom: 0;
}

.custom-images-views .custom-low-images #arrow-bottom::before {
  content: "\25BC";
  position: absolute;
  width: 100%;
  color: white;
  bottom: 0;
  left: 0;
  transition: 0.3s;
}
  .custom-images-views .custom-low-images #arrow-bottom:hover::before {
    background-color: rgba(999, 999, 999, 0.25);
    cursor: pointer;
  }

.custom-images-views .custom-low-images img {
  border: 2px solid #000;
}
</style>