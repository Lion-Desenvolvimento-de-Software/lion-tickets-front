<template>
  <div class="px-3">
    <h1>Usuários</h1>

    <div v-if="$route.path == '/admin/usuarios'">
      <div class="w-100 d-flex justify-content-between custom-layout-action">
        <div class="custom-filters w-100"></div>
        <div class="custom-action-data">
          <RouterLink to="/admin/usuarios/new"><button class="btn btn-success" @click="claerDatas">Adicionar</button></RouterLink>
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
              <RouterLink :to="`/admin/usuarios/${item.id}`" @click="addDataEdit(item)">
                <button class="btn btn-success">
                  <font-awesome-icon :icon="['fa', 'pen']" />
                </button>
              </RouterLink>
              <button class="btn btn-danger" @click="deletar(item.id)"><font-awesome-icon :icon="['fas', 'trash']" /></button>
            </div>
          </template>
        </b-table>
      </div>
    </div>
    <RouterView v-else
          @salvar="salvarUsuario"
          v-slot="{ Component }">
      <component :is="Component">
        <div class="row" v-if="!isEdit">
          <div class="col d-flex custom-input">
            <label>Primeiro nome: *</label>
            <input v-model="dados.FirstName" type="text" name="Primeiro nome" placeholder="Insira o primeiro nome" autofocus />
            <!-- <span class="text-danger font-size">{{ getErrors?.nome[0] }}</span> -->
          </div>
          <div class="col d-flex custom-input">
            <label>Ultimo nome: *</label>
            <input v-model="dados.LastName" type="text" name="Ultimo nome" placeholder="Insira o último nome"  />
            <!-- <span class="text-danger font-size">{{ getErrors?.cnpj[0] }}</span> -->
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Nome do usuário: *</label>
            <input type="text" v-model="dados.Username" name="Nome do Usuário" />
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Email: *</label>
            <input type="email" v-model="dados.Email" name="email" />
          </div>
        </div>
        <div class="row" v-if="!isEdit">
          <div class="col d-flex custom-input">
            <label>Senha: *</label>
            <input type="password" v-model="dados.Password" name="password" />
          </div>
          <div class="col d-flex custom-input">
            <label>Confirmar senha: *</label>
            <input type="password" v-model="dados.ConfirmPassword" name="confirmar senha" />
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Telefone:</label>
            <input type="tel" v-model="dados.PhoneNumber" @input="mascaraTelefone" name="Telefone" placeholder="(11) 99999-9999" />
          </div>
          <div class="col d-flex custom-input">
            <label>Genero: *</label>
            <select v-model="dados.Genero" name="Genero">
              <option :value="null" selected>Selecione...</option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
            </select>
          </div>
          <div class="col d-flex custom-input">
            <label>Data de Aniversário:</label>
            <input type="date" v-model="dados.DataAniversario" name="BirthDay" />
          </div>
          <div class="col d-flex custom-input">
            <label>Função: *</label>
            <select v-model="dados.RoleName" name="RoleName">
              <option :value="null" selected>Selecione...</option>
              <option v-if="user?.role == 'Admin'" value="Admin">Admin</option>
              <option v-if="['Admin', 'Gerente'].includes(user?.role)" value="Gerente">Gerente</option>
              <option v-if="user?.role == 'Gerente'" value="Vendedor">Vendedor</option>
            </select>
          </div>
          <div class="col d-flex custom-input" v-if="dados.RoleName != null && dados.RoleName != 'Admin' && user?.role == 'Admin' && $route.params.id == 'new'">
            <label>Company: *</label>
            <select v-model="dados.CompanyId" name="RoleName">
              <option :value="null" selected>Selecione...</option>
              <option v-for="company in companies" :value="company.id" :key="company.Id">{{ company.nome }}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-button">
            <button class="btn btn-outline-secondary" @click="cancelar">Cancelar</button>
            <button class="btn btn-success" :disabled="!hasDatasInserted" @click="$route.params.id == 'new' ? salvarUsuario() : updateUsuario()">
              {{ $route.params.id == 'new' ? 'Salvar' : 'Editar' }}
            </button>
          </div>
        </div>
      </component>
    </RouterView>
  </div>
</template>

<script>
import UsuarioServices from '@/services/UsuarioServices';
import EmpresaService from '@/services/admin/empresaService';
import UserManager from '@/services/userManager';

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
      dados: {
        Id: null,
        FirstName: null,
        LastName: null,
        Username: null,
        Email: null,
        PhoneNumber: null,
        Genero: null,
        DataAniversario: null,
        Password: null,
        ConfirmPassword: null,
        RoleName: null,
        CompanyId: null
      },
      user: null,
      isEdit: false,
      companies: null
    }
  },

  mounted() {
    if (this.$route.params['id'] != "new") this.isEdit = true;
    this.getUsers();
  },

  computed: {
    hasDatasInserted() {
      return (this.hasFirstAndLastName && this.hasUsername && this.hasEmail && this.hasGenero && this.hasPassword && this.isPasswordConfirm && this.hasRole)
    },
    hasFirstAndLastName() {
      return ((this.dados.FirstName && this.dados.LastName) || this.isEdit) ? true : false;
    },
    hasUsername() {
      return this.dados.Username ? true : false;
    },
    hasEmail() {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(this.dados.Email);
    },
    hasGenero() {
      return this.dados.Genero ? true : false;
    },
    hasPassword(){
      return ((this.dados.Password != null && this.dados.Password.length >= 6) || this.isEdit) ? true : false;
    },
    isPasswordConfirm() {
      return ((this.dados.Password == this.dados.ConfirmPassword) || this.isEdit) ? true : false;
    },
    hasRole() {
      return this.dados.RoleName ? true : false;
    },
    getMensagem() {
      return this.mensagem;
    },
    getIsError() {
      return this.isError
    }
  },

  emits: ['showToastSuccess', 'showToastError'],

  methods: {
    async getUsers() {
      this.user = (await UserManager.getUser()).profile;
      if (this.user.role == "Admin") {
        this.companies = await EmpresaService.getEmpresasAll();
        this.users = await UsuarioServices.GetUsers(this.user.role);
      }



      if (this.isEdit) this.addDataEdit(this.users.find(item => item.id == this.$route.params.id));
    },

    async salvarUsuario() {
      this.dados.Genero = Number(this.dados.Genero);
      UsuarioServices.Criar(this.dados).then(() => {
        this.$emit('showToastSuccess', 'Criado com sucesso');
        this.$router.back();
        this.getUsers();
      }).catch(err => {
        console.log(err);
        this.$emit('showToastError', err);
      })
    },

    async updateUsuario() {
      this.dados.Genero = Number(this.dados.Genero);
      UsuarioServices.Update(this.dados).then(() => {
        this.$emit('showToastSuccess', 'Atualizado com sucesso!');
        this.$router.back();
        this.getUsers();
      }).catch(err => {
        console.log(err);
        this.$emit('showToastError', err);
      })
    },

    async deletar(id) {
      UsuarioServices.Delete(id).then(res => {
        this.$emit('showToastSuccess', res);
        this.getUsers();
      }).catch(err => {
        console.log(err);
        this.$emit('showToastError', err);
      })
    },

    mascaraTelefone(value) {
      this.$watch('dados.PhoneNumber', () => {
        this.dados.PhoneNumber = this.dados.PhoneNumber.replace(/[a-zA-Z]+/g, "");
      })
      let tecla = value;
      let telefone = this.dados.PhoneNumber.replace(/\D+/g, "");

      if (/^[0-9]$/i.test(tecla.data)) {
        let tamanho = telefone.length;

        if (tamanho >= 12) {
          this.dados.PhoneNumber = this.dados.PhoneNumber.replaceAll(/\d$/g, "");
          return;
        }
        
        if (tamanho > 10) {
          telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (tamanho > 5) {
          telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (tamanho > 2) {
          telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
          telefone = telefone.replace(/^(\d*)/, "($1");
        }

        this.dados.PhoneNumber = telefone;
      }

      if (!["deleteContentBackward", "deleteContentForward"].includes(tecla.type)) {
        return;
      }
    },
    addDataEdit(item) {
      this.isEdit = true;
      this.dados.Id = item?.id;
      this.dados.DataAniversario = item?.dataAniversario;
      this.dados.Genero = item?.genero;
      this.dados.Email = item?.email;
      this.dados.Username = item?.userName;
      this.dados.PhoneNumber = item?.phoneNumber;
      this.dados.RoleName = item?.roleName;
    },
    claerDatas() {
      this.isEdit = false;
      this.dados.Id = null;
      this.dados.DataAniversario = null;
      this.dados.Genero = null;
      this.dados.Email = null;
      this.dados.Username = null;
      this.dados.PhoneNumber = null;
      this.dados.RoleName = null;
    },
    cancelar() {
      this.$router.back();
      this.claerDatas();
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

.custom-input {
  flex-direction: column;
  align-items: flex-start;
}

.custom-input input, textarea, select {
  border-radius: 10px;
  border: 1px solid #000;
  padding: 2px 10px;
  width: 100%;
}

.custom-input select {
  height: 30px;
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
</style>