<template>
  <div class="px-3">
    <h1>Usuários</h1>

    <div v-if="$route.path == '/admin/usuarios'">
      <div class="w-100 d-flex justify-content-between custom-layout-action">
        <div class="custom-filters w-100"></div>
        <div class="custom-action-data">
          <RouterLink to="/admin/usuarios/new"><button class="btn btn-success" @click="clearDados">Adicionar</button></RouterLink>
        </div>
      </div>

      <div class="layout-table py-3">
        <b-table :items="users" 
                :fields="fields"
                striped 
                hover
                small>
          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center spacing-x">
              <RouterLink :to="`/admin/empresas/${item.id}`" @click="dados = row.item">
                <button class="btn btn-success">
                  <font-awesome-icon :icon="['fa', 'pen']" />
                </button>
              </RouterLink>
              <button class="btn btn-danger" @click="deletar(row.item.id)"><font-awesome-icon :icon="['fas', 'trash']" /></button>
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import UsuarioServices from '@/services/UsuarioServices';
import UserManager from '@/services/userManager'

export default {
  name: 'UsuariosAdmin',
  data() {
    return {
      fields: [
        { key: 'userName', label: 'Nome do Usuário' },
        { key: 'email', label: 'Email' },
        { key: 'phoneNumber', label: 'Telefone' },
        { key: 'genero', label: 'Genero' },
        { key: 'action', label: '' }
      ],
      users: null,
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      var user = await UserManager.getUser();
      this.users = await UsuarioServices.GetUsers(user.profile.role);
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

.spacing-x {
  column-gap: 10px;
}
</style>