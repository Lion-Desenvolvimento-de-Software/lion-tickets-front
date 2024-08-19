<template>
  <div>
    <b-table :items="data" 
            :fields="fields"
            striped 
            hover
            small
            :per-page="10"
            :current-page="getCurrentPageDivisionTen">
      <template #cell(action)="{ item }">
        <div class="d-flex justify-content-center spacing-x">
          <RouterLink :to="`/admin/usuarios/${item.id}`" >
            <button class="btn btn-success" @click="addDataEdit(item)">
              <font-awesome-icon :icon="['fa', 'pen']" />
            </button>
          </RouterLink>
          <button v-if="user.sub != item.id" class="btn btn-danger" @click="deletar(item.id)"><font-awesome-icon :icon="['fas', 'trash']" /></button>
        </div>
      </template>
      <template #cell(imageURL)="{ item }">
        <slot name="imageURL" v-bind="item.imageURL"></slot>
      </template>
    </b-table>
    <div class="pagination">
      {{ countData }}
      <b-pagination
        v-model="currentPage"
        :total-rows="getCountPaginations"
        :per-page="10"
        aria-controls="my-table"
        @change="$emit('changePagination')"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabelaComPaginacao',
  data() {
    return {
      currentPage: 1
    }
  },
  props: {
    user: null,
    data: {
      type: Array,
      default: () => [{ Id: 1, Nome: 'Mauricio' }, { Id: 2, Nome: 'Livia' }]
    },
    fields: {
      type: Array,
      default: () => ['Id', 'Nome']
    },
    countData: null,
  },
  computed: {
    getCurrentPageDivisionTen() {
      return (this.currentPage / 10)
    },
    getCountPaginations() {
      return this.countData;
    },
  },
  emits: ['update:currentPage', 'changePagination'],
}
</script>

<style scoped>
.pagination {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
}
</style>