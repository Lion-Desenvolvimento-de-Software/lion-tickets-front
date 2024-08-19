<template>
  <div>
    <h1>Ingressos/Produtos</h1>
    <div class="m-5">
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