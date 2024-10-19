<template>
  <div id="profile-company">
    <div class="layout">
      <div class="profile-company-image">
        <div class="vue-preview custom-preview rounded-circle" id="company-image">
          <div class="vue-preview__wrapper" style="width: 125px; height: 125px; left: calc(50% - 60px); top: calc(50% - 60px);">
            <b-img v-bind="styleImgComponent" rounded="circle" alt="Circle image" id="company-image" class="p-0 preview__image" :src="imageProfile ? imageProfile : getCompanyImage"></b-img>
          </div>
        </div>
        <span class="btn custom-circle-add-image" @click="$refs['modal-anexo-imagem'].show()" v-if="Usuario?.Role == 'Gerente'">
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
          <div class="col custom-descricao-e-length-descricao">
            <textarea :disabled="!isEdit" class="custom-form" id="descricao" name="Descrição" v-model="company.Descricao" placeholder="Insira uma descrição" rows="4" maxlength="500" />
            <span v-if="Usuario?.Role == 'Gerente'">{{ company.Descricao?.length }}/500</span>
          </div>
        </div>
      </div>
      <div class="custom-layout-buttons my-3" v-if="Usuario?.Role == 'Gerente'">
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
      isEdit: false,

      companyAux: {
        Nome: null,
        Descricao: null
      }
    }
  },
  emits: ['modificar'],
  props: {
    Usuario: null
  },
  components: {
    ModalAnexoImagem
  },
  created() {
    this.company = new Company();
    this.GetCompany();
  },
  computed: {
    getCompanyImage() {
      return this.company.ImagemEmpresa;
    },
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
    async salvarImagem(infoImagem) {
      this.$emit('modificar');
      this.imageProfile = infoImagem.srcImage.src;
      this.styleImgComponent.blank = false;
      await EmpresaService.SalvarImagemProfile({
        FileBase: infoImagem.srcImage.src,
        Type: infoImagem.srcImage.type,
        CompanyId: Number(this.$route.params.id)
      });
    },
    editar() {
      this.companyAux.Nome = this.company.Nome;
      this.companyAux.Descricao = this.company.Descricao;
      this.isEdit = true;
    },
    async salvar() {
      await EmpresaService.editarEmpresa(this.company);
      this.companyAux = {
        Nome: null,
        Descricao: null
      };
      this.isEdit = false;
    },
    cancelar() {
      this.company.Nome = this.companyAux.Nome;
      this.company.Descricao = this.companyAux.Descricao;
      this.companyAux = {
        Nome: null,
        Descricao: null
      };
      this.isEdit = false;
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
</style>