<template>
  <div id="profile-company">
    <div class="layout">
      <div class="profile-company-image">
        <div class="vue-preview custom-preview rounded-circle" id="company-image">
          <div class="vue-preview__wrapper" style="width: 125px; height: 125px; left: calc(50% - 60px); top: calc(50% - 60px);">
            <b-img v-bind="styleImgComponent" rounded="circle" alt="Circle image" id="company-image" class="p-0 preview__image" :src="imageProfile ? imageProfile : company.ImagemEmpresa"></b-img>
          </div>
        </div>
        <span class="btn custom-circle-add-image" @click="$refs['modal-anexo-imagem'].show()">
          <font-awesome-icon :icon="['fas', 'camera']" />
        </span>
      </div>
      <div class="lyaout-form-company">
        <div class="row">
          <div class="col">
            <input :disabled="!isEdit" class="custom-form" id="nome" type="text" name="Nome" v-model="company.Nome" placeholder="Insira o nome de sua empresa!">
          </div>
        </div>
        <div class="row">
          <div class="col">
            <textarea :disabled="!isEdit" class="custom-form" id="descricao" name="Descrição" v-model="company.Descricao" placeholder="Insira uma descrição" rows="4" maxlength="500" />
          </div>
        </div>
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
      isEdit: false
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
      if (company?.imagemEmpresa != null) this.styleImgComponent.blank = false;
      this.company.AddData({
        Id: company?.id,
        Nome: company?.nome,
        CNPJ: company?.cnpj,
        ImagemEmpresa: company?.imagemEmpresa,
        Descricao: company?.descricao
      })
    },
    salvar(infoImagem) {
      this.imageProfile = infoImagem.srcImage.src;
      this.styleImgComponent.blank = false;
      EmpresaService.SalvarImagemProfile({
        FileBase: infoImagem.srcImage.src,
        Type: infoImagem.srcImage.type,
        CompanyId: Number(this.$route.params.id)
      });
    },
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

.lyaout-form-company {
  display: grid;
  grid-template-rows: 3em;
}

input, textarea {
  height: 35px;
  border-radius: 15px;
  padding: 0 8px;
  font-size: 16px;
  width: 20%;
  border: 2px solid #000;
  box-shadow: 3px 1px 3px 1px rgba(0, 0, 0, 0.3);
}

.custom-form:disabled {
  background-color: #fff;
  box-shadow: none;
  border: none;
  text-align: center;
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
</style>