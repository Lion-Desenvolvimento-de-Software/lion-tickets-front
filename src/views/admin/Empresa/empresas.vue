<template>
  <div class="px-3">
    <h1>Empresas</h1>
    
    <div v-if="$route.path == '/admin/empresas'">
      <div class="w-100 d-flex justify-content-between custom-layout-action">
        <div class="custom-filters w-100"></div>
        <div class="custom-action-data">
          <RouterLink to="/admin/empresas/new"><button class="btn btn-success" @click="clearDados">Adicionar</button></RouterLink>
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
                @salvar="salvarEmpresa"
                :errors="getErrors"
                v-slot="{ Component }">
      <component :is="Component">
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Nome da empresa:</label>
            <input v-model="dados.nome" type="text" name="NomeEmpresa" placeholder="Insira o nome da empresa" autofocus />
            <span class="text-danger font-size">{{ getErrors?.nome[0] }}</span>
          </div>
          <div class="col d-flex custom-input">
            <label>CNPJ:</label>
            <input v-model="dados.cnpj" type="text" name="CNPJ" placeholder="99999999/0001-76" />
            <span class="text-danger font-size">{{ getErrors?.cnpj[0] }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Descrição:</label>
            <textarea v-model="dados.descricao" name="descricao"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-button">
            <button class="btn btn-outline-secondary" @click="cancelar">Cancelar</button>
            <button class="btn btn-success" @click="salvarEmpresa()">{{ $route.params.id == 'new' ? 'Salvar' : 'Editar' }}</button>
          </div>
        </div>
      </component>
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
        descricao: null,
      },

      errors: null
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
    },

    getErrors() {
      return this.errors;
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

    async salvarEmpresa(isEditar = this.$route.params.id != 'new') {
      this.$emit('setLoading', true);
      try {
        !isEditar ? await empresaService.salvarEmpresa(this.dados) : await empresaService.UpdateEmpresa(this.dados);
        this.$emit('showToastSuccess', `Empresa ${!isEditar ? 'cadastrado' : 'editado'} com sucesso!`);
        this.$router.back();
        this.items = await empresaService.getEmpresas(this.currentPage);
        await this.getCount();
      } catch (err) {
        let obj = {
          cnpj: err.response.data.errors['CNPJ'],
          nome: err.response.data.errors['Nome']
        }
        this.errors = obj;
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
    },
    async cancelar() {
      this.$router.back();
    },

    clearDados() {
      this.dados.nome = null;
      this.dados.cnpj = null;
      this.dados.descricao = null;
      this.errors = null;
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

.custom-input {
  flex-direction: column;
  align-items: flex-start;
}

.custom-input input, textarea {
  border-radius: 10px;
  border: 1px solid #000;
  padding: 2px 10px;
  width: 100%;
}

.custom-input label {
  padding: 0 5px;
}

.custom-input input:focus {
  outline: none;
}

.custom-button {
  width: 100%;
  justify-content: end;
}

.custom-button button {
  margin: 0 5px;
}

.font-size {
  font-size: 12px;
}

.error {
  border-color: red !important;
}
</style>