<template>
  <div id="profile-company">
    <div class="layout">
      <div class="profile-company-image">
        <div class="vue-preview custom-preview rounded-circle" id="company-image">
          <div class="vue-preview__wrapper" style="width: 125px; height: 125px; left: calc(50% - 60px); top: calc(50% - 60px);">
            <b-img v-bind="styleImgComponent" rounded="circle" alt="Circle image" id="company-image" class="p-0 preview__image" :src="imageProfile ? imageProfile : ''"></b-img>
          </div>
        </div>
        <span class="btn custom-circle-add-image" @click="$refs['modal-anexo-imagem'].show()">
          <font-awesome-icon :icon="['fas', 'camera']" />
        </span>
      </div>
    </div>
    <modal-anexo-imagem id="modal_anexo_imagem" ref="modal-anexo-imagem" @salvar="salvar"></modal-anexo-imagem>
  </div>
</template>

<script>
import EmpresaService from '@/services/admin/empresaService.js';
import Company from '@/assets/classes/Company.js';
import ModalAnexoImagem from '@/components/modals/ModalAnexoImagem.vue';

export default {
  name: "Company",
  data() {
    return  {
      company: null,
      imageProfile: null,
      styleImgComponent: { blank: true, blankColor: '#777', width: 120, height: 120, class: 'm1' },
    }
  },
  components: {
    ModalAnexoImagem
  },
  created() {
    this.company = new Company();
    this.GetCompany();
  },
  methods: {
    async GetCompany() {
      var company = await EmpresaService.getEmpresaById(this.$route.params.id);
      this.company.AddData({
        Id: company?.id,
        Nome: company?.nome,
        CNPJ: company?.cnpj
      })
    },
    salvar(infoImagem) {
      this.imageProfile = infoImagem.srcImage.src;
      this.styleImgComponent.blank = false;
    }
  }
}
</script>

<style scoped>
#profile-company {
  height: 100vh;
}
.layout {
  position: relative;
  
}
.profile-company-image {
  display: flex;
  width: 100%;
  height: 240px;
  justify-content: center;
  align-items: center;
}

.custom-preview {
  width: 120px;
  height: 120px;
}

#imageProfile {
  width: 120px;
  height: 120px;
}

#company-image ~ .custom-circle-add-image:hover {
  background: rgba(777, 777, 777, 0.5);
}

  #company-image ~ .custom-circle-add-image:hover svg {
    visibility: visible;
  }

.custom-circle-add-image {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  z-index: 25;
  align-content: center;
}

.custom-circle-add-image svg {
  visibility: hidden;
}
</style>