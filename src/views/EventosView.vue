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
        <div class="row">
          <div class="col custom-assessment">
            <font-awesome-icon :icon="['far', 'star']" />
            <font-awesome-icon :icon="['far', 'star']" />
            <font-awesome-icon :icon="['far', 'star']" />
            <font-awesome-icon :icon="['far', 'star']" />
            <font-awesome-icon :icon="['far', 'star']" />
            <span> Curtidas ({{ 0 }})</span>
          </div>
        </div>
        <div class="row gap-2">
          <div class="col">
            <h5>R$ {{ getTicketById?.price.toFixed(2) }}</h5>
          </div>
          <div class="col custom-radios">
            <input v-model="typeTicket" type="radio" class="btn-check" name="options-base" id="option5" autocomplete="off" :value="1" checked>
            <label class="btn" for="option5">Normal</label>

            <input v-model="typeTicket" type="radio" class="btn-check" name="options-base" id="option6" autocomplete="off" :value="2">
            <label class="btn" for="option6">Camarote</label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="custom-units">
              Unidades: <select v-model="unit">
                <option v-for="value in units" :key="value" :value="value">{{ value }}</option>
              </select>
              <span>({{ getQtdade }}) unidades restantes</span>
            </div>
          </div>
        </div>
        <div class="custom-buttons-payment">
          <button class="btn btn-primary">Comprar agora</button>
          <button class="btn btn-outline-primary" @click="SaveInTheCart">Adicionar ao carrinho</button>
        </div>
      </div>
      <div class="low-contents">
        <div class="description">
          <h2>Descrição:</h2>
          <p>
            {{ getTicketById?.description }}
          </p>
        </div>
        <div class="coments">
          <h2>Comentários:</h2>
          <hr />
          <ol>
            <h5>Mauricio: </h5>
            <ul>
              <li>
                <p>
                  Gostei, ótiom ingresso.
                  <br/>
                  Estou Amando este ingresso, parabéns!!
                </p>
              </li>
            </ul>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leyaoutCards from '@/components/leyaoutCards.vue';
import TicketServices from '@/services/TicketServices';
import CartServices from '@/services/CartServices';

export default {
  name: 'EventosView',
  data() {
    return {
      tickets: [],
      imageAuxId: '',
      imageURLView: '',
      
      units: [1, 2, 3, 4, 5, 6],
      unit: 1,
      typeTicket: 1
    }
  },
  components: {
    leyaoutCards
  },
  created() {
    this.getTicketsAsync();
  },
  props: {
    usuario: Object
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
    getQtdade() {
      return '+10';
      //return this.tickets.qtdade > 10 ? '+10' : this.tickets.qtdade;
    }
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
    async SaveInTheCart() {
      try {
        this.$emit("setLoading", true);
        var ticket = this.tickets.find(item => item.id == this.$route.params.id);
        ticket['typeTicket'] = this.typeTicket;
        ticket['quantidade'] = this.unit;
         var cart = {
           cartHeader: {
             userId: this.usuario?.Id
           },
           cartDetails: [{
             ticketId: ticket.id, 
             ticket: ticket, 
             count: this.unit, 
             countProducts: 0, 
             countTickets: this.unit,
             cartHeader: {
               userId: this.usuario?.Id
             }
           }]
         };
        await CartServices.SaveCartAsync(cart, "Ticket");
        this.$emit("getCartByUserId", this.usuario?.Id)
      } catch (err) {
        console.log(err);
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

.container-ticket {
  grid-template-rows: 80px auto 1fr;
  grid-template-columns: 1fr 4fr 1fr;
  height: 100%;
  grid-template-areas: 
    "header       header        header"
    "banner       banner        banner"
    "left-images  info          info"
    "left-images  info          info"
    "low-contents low-contents  low-contents"
    "footer       footer        footer";
  grid-gap: 10px;
  padding: 10px;
  font-weight: 400;
  font-size: 18px;
}

.custom-images-views {
  grid-area: left-images;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.2);
  padding: 5px;
}

.custom-images-views > img {
  width: 500px;
  height: 350px;
}

.custom-images-views .image-view {
  object-fit: contain;
  padding: 5px;
}

.custom-images-views .custom-low-images {
  position: relative;
  width: 80px;
  display: flex;
  justify-content: center;
  padding: 5px;
}

.custom-images-views .custom-low-images section {
  position: absolute;
  height: 335px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 3px;
  padding: 3px;
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
    min-height: 60px;
    cursor: pointer;
    object-fit: cover;
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
  gap: 15px;
  border-radius: 10px;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.2);
}

.info .custom-assessment svg {
  color: rgb(201, 201, 0);
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

.info .custom-units select {
  width: 3em;
  border: none;
}
  .info .custom-units select:hover {
    outline: none;
    border-bottom: 2px solid #3b35d8;
  }
  .info .custom-units select:focus {
    outline: none;
    border-bottom: 2px solid #3b35d8;
  }

.info .custom-units span {
  color: rgba(0, 0, 0, 0.3);
  font-size: 16px;
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
  bottom: 15px;
  width: 100%;
  left: 0;
  padding: 0 15px
}

.low-contents {
  grid-area: low-contents;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
  text-align: justify;
}

.description {
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.2);
}

  .description::-webkit-scrollbar {
    width: 8px;
    height: 8px;
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

.coments {
  border-radius: 10px;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.2);
  padding: 15px;
}

.coments ol {
  padding: 0;
}

.coments ol h5 {
  font-weight: 600;
  font-size: 22px;
}

.coments ol ul li {
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
}

@media(max-width: 830px) {
  .container-ticket {
    grid-template-rows: 50px 50px 1fr 1fr;
    grid-template-columns: 1fr;
    height: 100%;
    grid-template-areas: 
      "header"
      "banner"
      "left-images"
      "info"
      "low-contents"
      "footer";
  }
  
  .image-view {
    width: 100% !important;
  }
}

@media(max-width: 480px) {

  .custom-images-views {
    flex-wrap: wrap !important;
  }

  .custom-images-views .custom-low-images {
    width: 100%;
    border-radius: 0;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    height: 130px
  }

  .custom-images-views .custom-low-images section {
    width: calc(100% - 25px);
    height: auto !important;
    margin: 10px;
    overflow-x: auto !important;
    scrollbar-width: 8px;
    flex-direction: row;
  }

  section::-webkit-scrollbar-track {
    height: 8px !important;
  }
}

</style>