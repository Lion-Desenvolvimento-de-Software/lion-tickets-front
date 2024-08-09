<template>
  <div class="home">
    <div class="h-100">
      <div class="custom-menu">
        <div class="d-grid custom-items">
          <div class="custom-company-profile" v-if="!GetIsAdmin">
            <div class="company-profile-image">
              <router-link :to="`/admin/empresa/${company?.Id}`">
                <img class="my-1" width="35" height="35" :src="require('@/assets/images/R.png')">
              </router-link>
            </div>
          </div>
          <div class="item" :class="($route.name.includes('HomeAdmin') || $route.name.includes('DashboardAdmin')) ? 'selecionado' : ''">
            <router-link to="/admin/dashboard">Dashboard</router-link>
          </div>
          <div v-if="!GetIsAdmin" class="item" :class="$route.name.includes('ProdutosAdmin') ? 'selecionado' : ''">
            <router-link to="/admin/produtos">Produtos</router-link>
          </div>
          <div class="item" :class="$route.name.includes('UsuariosAdmin') ? 'selecionado' : ''">
            <router-link to="/admin/usuarios">Usuários</router-link>
          </div>
          <div v-if="GetIsAdmin" class="item" :class="$route.name.includes('EmpresasAdmin') ? 'selecionado' : ''">
            <router-link to="/admin/empresas">Empresas</router-link>
          </div>
        </div>
      </div>
    <router-view @setLoading="setLoading" 
                  @showToastSuccess="showToastSuccess" 
                  @showToastError="showToastError"
                  :Company="company"
                  class="custom-pages"></router-view>
    </div>
  </div>
</template>

<script>
import Company from '@/assets/classes/Company.js';
import EmpresaService from '@/services/admin/empresaService.js';
import { Usuario } from '@/assets/classes/Usuario.js';

export default {
  name: 'HomeAdmin',
  emits: ['setLoading', 'showToastSuccess', 'showToastError'],
  data() {
    return {
      company: null
    }
  },
  created() {
    this.GetCompanyByUserId();
  },
  computed: {
    GetIsAdmin() {
      return this.usuario?.Role == 'Admin';
    }
  },
  props: {
    usuario: {
      type: Object,
      default: new Usuario()
    }
  },
  methods: {
    async GetCompanyByUserId() {
      if (this.usuario.Role != "Admin") {
        EmpresaService.GetCompanyByUserId(this.usuario.Id).then(res => {
          this.company = new Company();
          this.company.AddData({
            Id: res.id,
            Nome: res.nome,
            CNPJ: res.cnpj
          });
        }).catch(err => {
          console.log(err)
        });
      }
    },
    setLoading(isLoading) {
      this.$emit('setLoading', isLoading);
    },
    showToastSuccess(mensagem) {
      this.$emit('showToastSuccess', mensagem)
    },
    showToastError(mensagem) {
      this.$emit('showToastError', mensagem)
    }
  }
}
</script>

<style scoped>
.home {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.custom-menu {
  position: fixed;
  width: 175px;
  height: 100%;
  padding: 15px 0;
  background-color: orange;
  box-shadow: 1px 0px 7px 1px rgba(0, 0, 0, .5);
  font-size: 18px;
}

.custom-pages {
  position: absolute;
  right: 0;
  width: calc(100% - 175px);
  height: 100%;
}

.custom-items {
  padding: 0;
  row-gap: 5px;
}

.custom-items .item {
  padding: 2px;

  background: linear-gradient(to left, orange 50%, lightblue 50%) right;
  background-size: 200%;
  transition: .2s ease-out;
  height: 35px;
  align-content: center;
}

  .custom-items .item:hover {
    background-position: left;
    cursor: pointer;
  }

.custom-items .item a {
  color: black;
  display: block;
  height: 100%;
}

.selecionado {
  background: lightblue !important;
}

.custom-company-profile {
  position: relative;
  left: 0;
  padding: 5px;
}
.company-profile-image {
  padding: 5px;
  width: auto;
}
</style>