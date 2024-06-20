<template>
  <div class="px-3">
    <h1>Empresas</h1>
    
    <div v-if="$route.path == '/admin/empresas'">
      <div class="w-100 d-flex justify-content-between custom-layout-action">
        <div class="custom-filters w-100"></div>
        <div class="custom-action-data">
          <button class="btn btn-success">Adicionar</button>
        </div>
      </div>

      <!-- Tudo componente para tabela de dados -->
      <div class="layout-table py-3">
        <table>
          <tr>
            <th v-for="field in fields" :key="field">{{ field }}</th>
          </tr>
          <tr v-for="item in items" :key="item.Id">
            <td v-for="field in fields" :key="field">{{ item[field] }}</td>
          </tr>
        </table>
        <div class="pagination">
          <button>
            <font-awesome-icon :icon="['fas', 'backward-step']" />
          </button>
          <button v-for="(_, index) in getPagination" :key="index">{{ index + 1 }}</button>
          <button>
            <font-awesome-icon :icon="['fas', 'forward-step']" />
          </button>
        </div>
      </div>
    </div>
    <RouterView v-else></RouterView>
  </div>
</template>

<script>
export default {
  name: 'EmpresasAdmin',
  data() {
    return {
      fields: [
        "Id", "Nome", "CNPJ", "Ativo"
      ],
      items: [
        { Id: 1, Nome: "Lion Sync", CNPJ: "161421671/0001", Ativo: 0 },
        { Id: 2, Nome: "Lion Sync", CNPJ: "161421671/0001", Ativo: 0 },
        { Id: 3, Nome: "Lion Sync", CNPJ: "161421671/0001", Ativo: 0 },
        { Id: 4, Nome: "Lion Sync", CNPJ: "161421671/0001", Ativo: 0 },
        { Id: 5, Nome: "Lion Sync", CNPJ: "161421671/0001", Ativo: 0 },
        { Id: 6, Nome: "Lion Sync", CNPJ: "161421671/0001", Ativo: 0 },
        { Id: 7, Nome: "Lion Sync", CNPJ: "161421671/0001", Ativo: 0 },
        { Id: 8, Nome: "Lion Sync", CNPJ: "161421671/0001", Ativo: 0 },
        { Id: 9, Nome: "Lion Sync", CNPJ: "161421671/0001", Ativo: 0 },
        { Id: 10, Nome: "Lion Sync", CNPJ: "161421671/0001", Ativo: 0 },
      ]
    }
  },

  computed: {
    getPagination() {
      return Number.parseInt(Math.ceil(this.items.length / 10).toString().slice(0, 6));
    }
  }
}
</script>

<style scoped>

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  height: calc(100% - 65px);
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