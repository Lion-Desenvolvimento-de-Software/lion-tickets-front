<template>
  <div class="container-xl">
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
        <img class="image-view" :src="getImageTicketLocal" >
        <div class="custom-low-images">
          <section ref="art1" id="sections">
            <img v-for="image in getTicketById?.files?.filter(value => value.type.includes('image'))" 
                :key="image" 
                :src="image.url"
                width="80" 
                height="80"
                :id="image.id"
                :class="getTicketById?.files[0].id == image.id ? 'selected' : ''"
                ref="imageAction"
                @click="viewImage(image)">
          </section>
        </div>
      </div>
      <div class="title">
        <h1>{{ getTicketById?.name }}</h1>
      </div>
      <div class="info">
        <div class="row gap-2">
          <div class="col">
            <h5>R$ {{ getTicketById?.price.toFixed(2) }}</h5>
          </div>
          <div class="col custom-radios">
            <input type="radio" class="btn-check" name="options-base" id="option5" autocomplete="off" checked>
            <label class="btn" for="option5">Normal</label>

            <input type="radio" class="btn-check" name="options-base" id="option6" autocomplete="off">
            <label class="btn" for="option6">VIP</label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="custom-units">
              <strong>
                Unidades: <input type="number" v-model="units">
              </strong>
            </div>
          </div>
        </div>
        <div class="custom-buttons-payment">
          <button class="btn btn-success">Comprar agora</button>
          <button class="btn btn-outline-success">Adicionar ao carrinho</button>
        </div>
      </div>
      <div class="description">
        <h2>Descrição:</h2>
        <p>
          {{ getTicketById?.description }}
        </p>
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
      imageAuxId: '',
      imageURLView: '',

      units: 1
    }
  },
  components: {
    leyaoutCards
  },
  created() {
    this.getTicketsAsync();
  },
  beforeUpdate() {
    if (this.$route.params.id) {
      this.addImageURLOrDefault();
      this.addImageAuxIdOrDefault();
    }
    else {
      this.clear();
    }
  },
  computed: {
    getTickets() {
      return this.tickets;
    },
    getTicketById() {
      return this.tickets.find(value => value.id == this.$route.params.id);
    },
    getImageTicketLocal() {
      return this.imageURLView;
    },
  },
  methods: {
    async getTicketsAsync() {
      this.$emit("setLoading", true);
      try {
        this.tickets = await TicketServices.GetAllTicketsAsync();
        this.imageURLView = this.tickets.find(value => value.id == this.$route.params.id)?.files[0]?.url;
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
      this.imageURLView = image.url;
      console.log(this.imageURLView)
      this.selectImage(image);
    },
    selectImage(image) {
      this.$refs['imageAction'].find(value => value.id == this.imageAuxId).classList = null;
      this.imageAuxId = image.id;
      this.$refs['imageAction'].find(value => value.id == image.id).classList = "selected";
    },
    addImageURLOrDefault() {
      if (!this.imageURLView) this.imageURLView = this.tickets.find(value => value.id == this.$route.params.id)?.files[0]?.url;
    },
    addImageAuxIdOrDefault() {
      if (!this.imageAuxId) this.imageAuxId = this.tickets.find(value => value.id == this.$route.params.id).files[0].id;
    },
    clear() {
      this.imageAuxId = '';
      this.imageURLView = '';
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
    "left-images  info          info"
    "left-images  info          info"
    "description  description   description"
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

.title {
  grid-area: banner;
  text-align: center;
}

.info {
  position: relative;
  grid-area: info;
  text-align: start;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-left: 1px solid #000;
  gap: 15px;
}

.info .full-info {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}

.info .custom-units strong {
  display: flex;
  flex-wrap: nowrap;
  column-gap: 10px;
}

.info .custom-units input {
  width: 3em;
  border: none;
  border-bottom: 1px solid #000;
}
  .info .custom-units input:focus {
    outline: none;
    border-bottom: 2px solid #3b35d8;
  }

.info .custom-radios {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0fr;
}

.info .custom-buttons-payment {
  position: absolute;
  display: grid;
  gap: 5px;
  bottom: 0;
  width: 100%;
}

.description {
  display: block;
  text-align: start;
  border-top: 1px solid;
}

  .description::-webkit-scrollbar {
    width: 8px;
  }

  .description::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }

  .description::-webkit-scrollbar-thumb {
    background: rgb(77, 77, 77); 
    border-radius: 10px;
  }

  .description::-webkit-scrollbar-thumb:hover {
    background: rgba(77, 77, 77, 0.5);
  }

.description p {
  font-size: medium;
  font-style: normal;
  font-family: system-ui;
}
</style>