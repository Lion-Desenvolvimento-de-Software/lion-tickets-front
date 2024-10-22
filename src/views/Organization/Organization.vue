<template>
  <div class="container-fluid layout">
    <h1 class="custom-form">{{ organization.Nome }}</h1>
    <div class="profile-organization-image">
      <div class="vue-preview custom-preview rounded-circle" id="organization-image">
        <div class="vue-preview__wrapper position-relative" style="width: 125px; height: 125px; left: calc(50% - 60px); top: calc(50% - 60px);">
          <b-img v-bind="styleImgComponent" rounded="circle" alt="Circle image" id="organization-image" class="p-0 preview__image" :src="imageProfile ? imageProfile : getOrganizationImage"></b-img>
          <span class="btn custom-circle-add-image" @click="$refs['modal-anexo-imagem'].show()" v-if="usuario?.Role == 'Gerente' && isEdit">
            <font-awesome-icon :icon="['fas', 'camera']" />
          </span>
        </div>
      </div>
      <div class="layout-form-organization">
        <div class="row">
          <div class="col custom-descricao-e-length-descricao">
            <h4>Curtidas</h4>
            <b>0</b>
            {{ organization }}
          </div>
          <div class="col custom-descricao-e-length-descricao">
            <h4>Seguidores</h4>
            <b>0</b>
          </div>
          <div class="col custom-descricao-e-length-descricao">
            <h4>Seguindo</h4>
            <b>0</b>
          </div>
        </div>
      </div>
    </div>
    <div id="items" class="h-100 p-5">
      <div class="w-100">
        <div class="w-100 d-flex flex-row justify-content-between info-row-date-prox">
          <p>Ingressos proximo da data do evento</p>
          <a href="">Ver mais</a>
        </div>
        <div id="layout-card-horizontal">
          <div class="card-principal" v-for="ticket in getTickets" :key="ticket.id">
            <div class="image-box h-100">
              <img :src="ticket?.imageURL" alt="imagem ticket">
            </div>
            <div class="content">
              <h2>{{ ticket?.name }}</h2>
              <p>{{ ticket?.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tickets-todo">
        <div id="tickets">
          <div class="card-principal" v-for="ticket in getTickets" :key="ticket.id">
            <div class="image-box h-100">
              <img :src="ticket?.imageURL" alt="imagem ticket">
            </div>
            <div class="content">
              <h2>{{ ticket?.name }}</h2>
              <p>{{ ticket?.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="custom-layout-buttons my-3" v-if="usuario?.Role == 'Gerente'">
      <div v-if="!isEdit">
        <button class="btn btn-success" @click="editar">Editar</button>
      </div>
      <div class="custom-button" v-else>
        <button class="btn btn-outline-secondary" @click="cancelar">Cancelar</button>
        <button class="btn btn-success" @click="salvar">Salvar</button>
      </div>
    </div>
  </div>
  <modal-anexo-imagem id="modal_anexo_imagem" ref="modal-anexo-imagem" @salvar="salvarImagem"></modal-anexo-imagem>
</template>

<script>
import OrganizationService from '@/services/admin/OrganizationService.js';
import TicketServices from '@/services/TicketServices';
import Organization from '@/assets/classes/Organization.js';
import ModalAnexoImagem from '@/components/modals/ModalAnexoImagem.vue';

export default {
  name: "Organization",
  data() {
    return  {
      organization: null,
      imageProfile: null,
      styleImgComponent: { blank: true, blankColor: '#777', width: 120, height: 120, class: 'm1' },

      ticketsByOrganization: null
    }
  },
  emits: ['modificar'],
  props: {
    usuario: null
  },
  components: {
    ModalAnexoImagem
  },
  async created() {
    this.organization = new Organization();
    await this.GetOrganization();
  },
  computed: {
    getOrganizationImage() {
      return this.organization.ImagemOrganizacao;
    },
    getTickets(){
      return this.ticketsByOrganization;
    }
  },
  methods: {
    async GetOrganization() {
      try {
        this.$emit('setLoading', true);
        var organization = await OrganizationService.getOrganizationById(this.$route.params.id);
        if (organization?.ImagemOrganizacao != null) this.styleImgComponent.blank = false;
        this.organization.AddData({
          Id: organization?.id,
          Nome: organization?.nome,
          CNPJ: organization?.cnpj,
          ImagemOrganizacao: organization?.organizationImage,
          Descricao: organization?.descricao
        });
        await this.getTicketByOrganizationId(this.$route.params.id);
      } catch (err) {
        console.log(err);
      } finally {
        this.$emit('setLoading', false);
      }
    },
    async getTicketByOrganizationId(organizationId) {
      try {
        this.$emit('setLoading', true);
        this.ticketsByOrganization = await TicketServices.GetTicketsByOrganizationIdAsync(organizationId);
        console.log(this.ticketsByOrganization)
      } catch (err) {
        console.log(err);
      } finally {
        this.$emit('setLoading', false);
      }
    },
    async salvarImagem(infoImagem) {
      this.$emit('modificar');
      this.imageProfile = infoImagem.srcImage.src;
      this.styleImgComponent.blank = false;
      await OrganizationService.SalvarImagemProfile({
        FileBase: infoImagem.srcImage.src,
        Type: infoImagem.srcImage.type,
        OrganizationId: Number(this.$route.params.id)
      });
    },
    editar() {
      this.organizationAux.Nome = this.organization.Nome;
      this.organizationAux.Descricao = this.organization.Descricao;
      this.isEdit = true;
    },
    async salvar() {
      await OrganizationService.editarOrganization(this.organization);
      this.organizationAux = {
        Nome: null,
        Descricao: null
      };
      this.isEdit = false;
    },
    cancelar() {
      this.organization.Nome = this.organizationAux.Nome;
      this.organization.Descricao = this.organizationAux.Descricao;
      this.organizationAux = {
        Nome: null,
        Descricao: null
      };
      this.isEdit = false;
    },
  }
}
</script>

<style scoped>
#profile-organization {
  height: 100vh;
}
.layout {
  position: relative;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 180px 120px 1fr;
  grid-template-areas: 
  "title            title"
  "profile-image-organization  profile-organization"
  "items            items"
  "footer           footer";
  align-items: center;
}
.profile-organization-image {
  grid-area: profile-image-organization;
  display: flex;
  width: 100%;
  height: 240px;
  justify-content: center;
  align-items: center;
}

.custom-preview {
  width: 180px;
  height: 120px;
}

#imageProfile {
  width: 120px;
  height: 120px;
}

#organization-image ~ .custom-circle-add-image:hover {
  background: rgba(777, 777, 777, 0.5);
}

  #organization-image ~ .custom-circle-add-image:hover svg {
    visibility: visible;
  }

.custom-circle-add-image {
  position: absolute;
  width: 100%;
  height: 120px;
  border-radius: 50%;
  z-index: 25;
  align-content: center;
  left: 0;
}

.custom-circle-add-image svg {
  visibility: hidden;
}

.layout-form-organization {
  width: 100%;
  grid-area: profile-organization;
}

input, textarea {
  height: 35px;
  border-radius: 15px;
  padding: 0 8px;
  font-size: 16px;
  width: 100%;
  border: 2px solid #000;
  box-shadow: 3px 1px 3px 1px rgba(0, 0, 0, 0.3);
}

.custom-form:disabled {
  grid-area: title;
  background-color: #fff;
  box-shadow: none;
  border: none;
  text-align: center;
  top: 0;
}

textarea:disabled {
  padding: 25px 0;
}

textarea {
  height: 120px;
  max-height: 150px;
  resize: none;
  font-family: "Gill Sans", sans-serif;
}

.custom-descricao-e-length-descricao {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 3px;
}

.custom-layout-buttons {
  display: flex;
  justify-content: center;
}

.custom-button {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 15px
}

#items {
  grid-area: items;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 45px;
}

.info-row-date-prox a {
  color: #000;
  justify-content: space-between;
}

  .info-row-date-prox a:hover {
    color: #000;
    opacity: .5;
  }

#layout-card-horizontal {
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  column-gap: 25px;
  overflow-x: hidden;
}

.card-principal {
  width: 270px;
  aspect-ratio: 1 / 0.7;
  border-radius: 8px;
  position: relative;
}

.card-principal .image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s ease-in-out;
}

.card-principal::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid white;
  border-radius: inherit;
  opacity: 0;
  transition: 0.4s ease-in-out;
}

.card-principal:hover img {
  filter: grayscale(1) brightness(0.4);
}

.card-principal:hover::after {
  opacity: 1;
  inset: 20px;
}

.card-principal:hover::after {
  opacity: 1;
  inset: 20px;
}

.card-principal .content {
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}

.card-principal .content h2,
.card-principal .content p {
  opacity: 0;
  transition: 0.4s 0.2s ease;
}
.card-principal .content h2 {
  margin-bottom: 12px;
  scale: 0.7;
}
.card-principal .content p {
  font-size: 14px;
  line-height: 1.5;
  color: #d1d1d1;
  transform: translateY(50%);
}
.card-principal:hover .content h2 {
  scale: 1;
  opacity: 1;
}
.card-principal:hover .content P {
  opacity: 1;
  transform: translateY(0);
}

#tickets {
  width: 100%;
  display: flex;
  flex-grow: inherit;
  column-gap: 25px;
  overflow-x: hidden;
}
</style>