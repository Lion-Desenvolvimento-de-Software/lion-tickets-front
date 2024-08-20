<template>
  <div>
    <h1>Ingressos/Produtos</h1>
    <div class="m-5" v-if="!$route.params.id">
      <div class="custom-layout-button">
        <RouterLink :to="`${$route.fullPath}/new`">
          <button class="btn btn-success">Adicionar</button>
        </RouterLink>
      </div>
      <div>
        <b-card no-body>
          <b-tabs v-model="tabIndex" card>
            <b-tab title="Ingressos" :title-link-class="'Ingressos'">
              <tabela-com-paginacao :count-data="12"></tabela-com-paginacao>
            </b-tab>
            <b-tab title="Produtos" :title-link-class="'Produtos'">
              <tabela-com-paginacao :data="dataProdutos"
                                    :fields="fields"
                                    v-model:current-page="currentPage" 
                                    @change-pagination="GetProdutos(currentPage)" >
                          
                <template #imageURL="imageURL">
                  <img :src="imageURL" width="40" height="40">
                </template>

              </tabela-com-paginacao>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
    <RouterView v-else
          @salvar="salvarUsuario"
          v-slot="{ Component }">
      <component :is="Component">
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Tipo: *</label>
            <select v-model="tipo" :options="options">
              <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Nome: *</label>
            <input v-model="name" type="text" name="Nome" placeholder="Insira um titulo para venda!"  />
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Preço: *</label>
            <input v-model="price" type="text" name="Preço" placeholder="0.00"  />
          </div>
          <div class="col d-flex custom-input" v-if="tipo == 1">
            <label>Categoria: *</label>
            <select v-model="category" :options="categorias">
              <option v-for="categoria in categorias" :key="categoria.value" :value="categoria.value">
                {{ categoria.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Descrição: *</label>
            <b-form-textarea
              id="textarea"
              v-model="description"
              placeholder="Adicione uma descrição"
              maxlength="500"
              rows="3"
              max-rows="6" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input-anexo-arquivos @handleFiles="handleFiles" v-model:files="images" :multiple="true" classStyle="flex-column"></input-anexo-arquivos>
          </div>
        </div>
        <div class="row">
          <div class="d-flex justify-content-end w-100 gap-2">
            <button class="btn btn-outline-secondary">Cancelar</button>
            <button :disabled="!canSave" class="btn btn-success" @click="Salvar">Salvar</button>
          </div>
        </div>
      </component>
    </RouterView>
  </div>
</template>

<script>
import TabelaComPaginacao from '@/components/Tabelas/TabelaComPaginacao.vue';
import ProdutosServices from '@/services/ProdutosServices.js';
import inputAnexoArquivos from '@/components/inputs/inputAnexoArquivos.vue';

export default {
  name: 'IngressosProdutosAdmin',
  components: {
    TabelaComPaginacao,
    inputAnexoArquivos
  },
  data() {
    return {
      dataProdutos: null,
      currentPage: 1,
      tipo: null,
      name: null,
      price: null,
      description: "",
      images: [],
      category: null,
      fields: [
        { key: 'imageURL', label: 'Fotos' },
        { key: 'id', label: 'Id' },
        { key: 'price', label: 'Preço' },
        { key: 'description', label: 'Descrição' },
        { key: 'categoryName', label: 'Categoria' },
      ],
      options: [
        { value: null, text: 'Selecione...' },
        { value: 1, text: 'Produtos' },
        { value: 2, text: 'Ingressos' },
      ],
      categorias: [
        { value: null, text: 'Selecione...' },
        { value: 'Roupas', text: 'Roupas' },
        { value: 'Acessórios', text: 'Acessórios' },
        { value: 'Chapéus', text: 'Chapéus' },
        { value: 'Sapatos', text: 'Sapatos' },
      ]
    }
  },
  computed: {
    canSave() {
      if (this.tipo == 1) {
        return (this.price && this.description.length > 15 && this.category && this.images.length >= 1);
      }
      return false;
    }
  },
  created() {
    this.GetProdutos();
    this.GetIngressos();
  },
  methods: {
    async GetProdutos(pagination = 0) {
      this.dataProdutos = await ProdutosServices.GetProdutos(pagination);
    },
    async GetIngressos() {
      console.log("Ingressos");
    },
    async Salvar() {
      const imageBase64 = await this.convertToBase64(this.images[0]);
      if (this.tipo == 1) {
        let formData = new FormData();
        formData.append("Name", this.name);
        formData.append("Price", this.price);
        formData.append("Description", this.description);
        formData.append("CategoryName", this.category);
        formData.append("ImageURL", imageBase64.replaceAll(/^data:image\/[a-zA-Z]+;base64,/g, ''));
        
        for(let index = 0; index < this.images.length; index++) {
          formData.append("Images", this.images[index]);
        }

        await ProdutosServices.SalvarProduto(formData);
      }
    },
    async SalvarIngresso() {
      console.log("hello world!");
    },

    handleFiles(files) {
      this.images = files;
    },
    convertToBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  }
}
</script>

<style scoped>
.custom-layout-button {
  width: 100%;
  display: flex;
  justify-content: end;
  margin: 15px 0;
  padding: 0 5px;
}

.custom-input {
  flex-direction: column;
  align-items: flex-start;
}

.custom-input input, select, textarea {
  height: 30px;
  width: 100%;
  padding: 0 6px;
  background-color: white;
  border: 1px solid #000;
  border-radius: 4px;
}
</style>