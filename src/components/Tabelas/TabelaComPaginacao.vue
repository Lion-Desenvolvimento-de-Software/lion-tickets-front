<template>
  <div>
    <b-table :items="data" 
            :fields="fields"
            striped 
            hover
            small
            :busy="busy"
            :per-page="10"
            :current-page="getCurrentPageDivisionTen">

      <template #table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="mx-2">Loading...</strong>
        </div>
      </template>
      <template #cell(price)="{ item }">
        <span>{{ item.price.toFixed(2) }}</span>
      </template>
      <template #cell(dateEvent)="{ item }">
        <span>{{ new Date(item.dateEvent).toLocaleDateString("pt-BR") }}</span>
      </template>
      <template #cell(timeEvent)="{ item }">
        <span>{{ item.timeEvent.split(":")[0] }}:{{ item.timeEvent.split(":")[1] }}</span>
      </template>
      <template #cell(action)="{ item }">
        <div class="d-flex justify-content-center gap-2">
          <RouterLink :to="`/admin/ingressos-produtos/${item.id}`" >
            <button class="btn btn-success" @click="$emit('addDataEdit', item)">
              <font-awesome-icon :icon="['fa', 'pen']" />
            </button>
          </RouterLink>
          <button class="btn btn-danger" @click="$emit('Deletar', item.id)"><font-awesome-icon :icon="['fas', 'trash']" /></button>
        </div>
      </template>
      <template #cell(imageURL)="{ item }">
        <slot name="imageURL" v-bind="item"></slot>
      </template>
    </b-table>
    <div class="pagination">
      {{ countData }}
      <b-pagination
        v-model="currentPage"
        :total-rows="getCountPaginations"
        :per-page="10"
        aria-controls="my-table"
        @change="handlePagination"
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
    busy: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getCurrentPageDivisionTen() {
      return (this.currentPage / 10)
    },
    getCountPaginations() {
      return this.countData;
    },
    getDateFormatBR(dateOrigin) {
      let date = new Date(dateOrigin);
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
  },
  emits: ['update:currentPage', 'changePagination', 'Deletar', 'addDataEdit'],
  methods: {
    handlePagination(event) {
      this.$emit('update:currentPage', event)
      this.$emit('changePagination');
    }
  }
}
</script>

<style scoped>
.pagination {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
}
</style>