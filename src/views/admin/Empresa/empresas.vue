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
              <button class="btn btn-success" @click="editar(row)"><font-awesome-icon :icon="['fa', 'pen']" /></button>
              <button class="btn btn-danger" @click="deletar(row)"><font-awesome-icon :icon="['fas', 'trash']" /></button>
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
                @getEmpresas="getEmpresas"
                @salvarEmpresa="salvarEmpresa">
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
      currentPage: 1
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
        console.log(this.items)
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
        this.items = await this.getEmpresas();
      } catch (err) {
        console.log(err);
      } finally {
        this.$emit('setLoading', false);
      }
    },

    async getCount() {
      this.countData = await empresaService.getCount();
    },
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