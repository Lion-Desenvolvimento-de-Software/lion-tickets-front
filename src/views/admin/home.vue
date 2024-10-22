<template>
  <div class="home">
    <div class="h-100">
      <div class="custom-menu">
        <div class="d-grid custom-items">
          <div class="custom-organization-profile" v-if="!GetIsAdmin">
            <div class="organization-profile-image">
              <router-link :to="`/admin/organizacao/${organization?.Id}`">
                <b-img v-bind="styleImgComponent" rounded="circle" alt="Circle image" id="organization-image" class="my-1 p-0 preview__image" width="35" height="35" :src="organization?.ImagemOrganizacao" />
              </router-link>
            </div>
          </div>
          <div class="item" :class="($route.name.includes('HomeAdmin') || $route.name.includes('DashboardAdmin')) ? 'selecionado' : ''">
            <router-link to="/admin/dashboard">Dashboard</router-link>
          </div>
          <div v-if="!GetIsAdmin" class="item" :class="$route.name.includes('ProdutosAdmin') ? 'selecionado' : ''">
            <router-link to="/admin/ingressos-produtos">Ingressos/Produtos</router-link>
          </div>
          <div v-if="GetIsGerente || GetIsAdmin" class="item" :class="$route.name.includes('UsuariosAdmin') ? 'selecionado' : ''">
            <router-link to="/admin/usuarios">Usuários</router-link>
          </div>
          <div v-if="GetIsAdmin" class="item" :class="$route.name.includes('OrganizationsAdmin') ? 'selecionado' : ''">
            <router-link to="/admin/organizacoes">Organizações</router-link>
          </div>
        </div>
      </div>
    <router-view @setLoading="setLoading" 
                  @showToastSuccess="showToastSuccess" 
                  @showToastError="showToastError"
                  @modificar="modificar"
                  :Organization="organization"
                  :Usuario="usuario"
                  class="custom-pages"></router-view>
    </div>
  </div>
</template>

<script>
import Organization from '@/assets/classes/Organization.js';
import OrganizationService from '@/services/admin/OrganizationService.js';
import { Usuario } from '@/assets/classes/Usuario.js';

export default {
  name: 'HomeAdmin',
  data() {
    return {
      organization: null,
      styleImgComponent: { blank: true, blankColor: '#777', width: 120, height: 120, class: 'm1' },
    }
  },
  beforeMount() {
    this.GetOrganizationByUserId();
  },
  computed: {
    GetIsAdmin() {
      return this.usuario?.Role == 'Admin';
    },
    GetIsGerente() {
      return this.usuario?.Role == "Gerente";
    }
  },
  props: {
    usuario: {
      type: Object,
      default: new Usuario()
    }
  },
  emits: ['setLoading', 'showToastSuccess', 'showToastError', 'atualizarImagem'],
  methods: {
    async GetOrganizationByUserId() {
      if (this.usuario.Role != "Admin") {
        try {
          this.setLoading(true);
          OrganizationService.GetOrganizationByUserId(this.usuario.Id).then(res => {
            this.organization = new Organization();
            this.organization.AddData({
              Id: res.id,
              Nome: res.nome,
              CNPJ: res.cnpj,
              ImagemOrganizacao: res.imagemOrganizacao
            });
            if (this.organization?.ImagemOrganizacao) {
              this.styleImgComponent.blank = false;
            }
          }).catch(err => {
            console.log(err)
          }).finally(() => {
            this.setLoading(false);
          });
        } catch (err) {
          console.log(err);
          this.setLoading(false);
        }
      }
    },
    modificar() {
      console.log("Entrei")
    },

    setLoading(isLoading) {
      this.$emit('setLoading', isLoading);
    },
    showToastSuccess(mensagem) {
      this.$emit('showToastSuccess', mensagem)
    },
    showToastError(mensagem) {
      this.$emit('showToastError', mensagem)
    },
  }
}
</script>

<style scoped>
.home {
  margin: 0;
  padding: 0;
  height: 100%;
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

.custom-organization-profile {
  position: relative;
  left: 0;
  padding: 5px;
}
.organization-profile-image {
  padding: 5px;
  width: auto;
}
</style>