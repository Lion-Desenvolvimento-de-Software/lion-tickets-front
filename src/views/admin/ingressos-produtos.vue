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
            <select :options="options">
              <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Preço: *</label>
            <input type="text" name="Preço" placeholder="0.00"  />
          </div>
          <div class="col d-flex custom-input">
            <label>Categoria: *</label>
            <select :options="categorias">
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
              placeholder="Adicione uma descrição"
              maxlength="500"
              rows="3"
              max-rows="6" />
          </div>
        </div>
      </component>
    </RouterView>
  </div>
</template>

<script>
import TabelaComPaginacao from '@/components/Tabelas/TabelaComPaginacao.vue';
import ProdutosServices from '@/services/ProdutosServices.js';

export default {
  name: 'IngressosProdutosAdmin',
  components: {
    TabelaComPaginacao
  },
  data() {
    return {
      dataProdutos: null,
      currentPage: 1,
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
        { value: 1, text: 'Roupas' },
        { value: 2, text: 'Acessórios' },
        { value: 3, text: 'Chapéus' },
        { value: 4, text: 'Sapatos' },
      ]
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