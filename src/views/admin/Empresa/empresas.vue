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
        <table>
          <tr>
            <th v-for="field in fields" :key="field">{{ field }}</th>
          </tr>
          <tr v-for="item in getItems" :key="item.Id">
            <td v-for="field in fields" :key="field">{{ item[field] }}</td>
          </tr>
        </table>
        <div class="pagination">
          <button>
            <font-awesome-icon :icon="['fas', 'backward-step']" />
          </button>
          <button v-for="(_, index) in getCountPaginations" :key="index" @click="getEmpresas(index + 1)">{{ index + 1 }}</button>
          <button>
            <font-awesome-icon :icon="['fas', 'forward-step']" />
          </button>
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
        "id", "nome", "descricao", "cnpj", "ativo", "Ação"
      ],
      items: [],
      countData: 0,
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
    getItems() {
      return this.items;
    },

    getCountPaginations() {
      return this.countData;
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
        this.items = await empresaService.getEmpresas();
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

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

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
</style>