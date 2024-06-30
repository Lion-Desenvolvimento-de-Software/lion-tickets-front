<template>
  <div class="px-3">
    <h1>Empresas</h1>
    
    <div v-if="$route.path == '/admin/empresas'">
      <div class="w-100 d-flex justify-content-between custom-layout-action">
        <div class="custom-filters w-100"></div>
        <div class="custom-action-data">
          <RouterLink to="/admin/empresas/new"><button class="btn btn-success">Adicionar</button></RouterLink>
        </div>
      </div>

      <!-- Tudo componente para tabela de dados -->
      <div class="layout-table py-3">
        <b-table id="my-table"
                :items="getItems" 
                :fields="fields" 
                striped 
                hover
                small
                :per-page="10"
                :current-page="getCurrentPageDivisionTen"
          >
          <template #cell(Ação)="row">
            <div class="d-flex justify-content-center spacing-x">
              <RouterLink :to="`/admin/empresas/${row.item.id}`" @click="dados = row.item"><button class="btn btn-success"><font-awesome-icon :icon="['fa', 'pen']" /></button></RouterLink>
              <button class="btn btn-danger" @click="deletar(row.item.id)"><font-awesome-icon :icon="['fas', 'trash']" /></button>
            </div>
          </template>
        </b-table>
        <div class="pagination">
          {{ countData }}
          <b-pagination
            v-model="currentPage"
            :total-rows="getCountPaginations"
            :per-page="10"
            aria-controls="my-table"
            @change="getEmpresas"
          ></b-pagination>
        </div>
      </div>
    </div>
    <RouterView v-else
                @salvarEmpresa="salvarEmpresa"
                @editarEmpresa="editarEmpresa"
                :Nome="dados.nome"
                :Cnpj="dados.cnpj"
                :Descricao="dados.descricao">
    </RouterView>
  </div>
</template>

<script>
import empresaService from '@/services/admin/empresaService';

export default {
  name: 'EmpresasAdmin',
  data() {
    return {
      fields: [
        "id", "nome", "descricao", "cnpj", "Ação"
      ],
      items: [],
      countData: 0,
      currentPage: 1,

      dados: {
        nome: null,
        cnpj: null,
        descricao: null
      }
    }
  },

  emits: ['setLoading', 'showToastSuccess', 'showToastError'],

  async mounted() {
    this.$emit('setLoading', true);
    await this.getEmpresas();
    await this.getCount();
    this.$emit('setLoading', false);
  },

  computed: {
    getRows() {
      return this.items.length;
    },

    getItems() {
      return this.items;
    },

    getCountPaginations() {
      return this.countData;
    },

    getCurrentPageDivisionTen() {
      return (this.currentPage / 10)
    }
  },

  methods: {
    async getEmpresas(pagina = 1) {
      this.$emit('setLoading', true);
      try {
        this.items = await empresaService.getEmpresas(pagina);
      } catch (err) {
        console.log(err);
      } finally {
        this.$emit('setLoading', false);
      }
    },

    async salvarEmpresa(obj) {
      this.$emit('setLoading', true);
      try {
        await empresaService.salvarEmpresa(obj);
        this.$emit('showToastSuccess', 'Empresa cadastrado com sucesso!');
        this.$router.back();
        this.items = await empresaService.getEmpresas(this.currentPage);
        await this.getCount();
      } catch (err) {
        console.log(err);
      } finally {
        this.$emit('setLoading', false);
      }
    },

    async editarEmpresa(obj) {
      this.$emit('setLoading', true);
      try {
        await empresaService.editarEmpresa(obj);
        this.$emit('showToastSuccess', 'Empresa editado com sucesso!');
        this.$router.back();
        this.items = await empresaService.getEmpresas(this.currentPage);
        await this.getCount();
      } catch (err) {
        console.log(err);
      } finally {
        this.$emit('setLoading', false);
      }
    },

    async getCount() {
      this.countData = await empresaService.getCount();
    },

    async deletar(id) {
      try {
        await empresaService.DeletarEmpresa(id);
        this.$emit('showToastSuccess', 'Empresa deletado com sucesso!');
        this.currentPage = 1;
        this.items = await empresaService.getEmpresas();
        await this.getCount();
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
.layout-table {
  height: 640px;
  display: flex;
  row-gap: 15px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
}

.custom-layout-action {
  column-gap: 15px;
}

.spacing-x {
  column-gap: 10px;
}
</style>