<template>
  <div class="home">
    <div class="h-100">
      <div class="custom-menu">
        <div class="d-grid custom-items">
          <div class="item" :class="($route.name.includes('HomeAdmin') || $route.name.includes('DashboardAdmin')) ? 'selecionado' : ''">
            <router-link to="/admin/dashboard">Dashboard</router-link>
          </div>
          <div class="item" :class="$route.name.includes('ProdutosAdmin') ? 'selecionado' : ''">
            <router-link to="/admin/produtos">Produtos</router-link>
          </div>
          <div class="item" :class="$route.name.includes('UsuariosAdmin') ? 'selecionado' : ''">
            <router-link to="/admin/usuarios">Usuários</router-link>
          </div>
          <div class="item" :class="$route.name.includes('EmpresasAdmin') ? 'selecionado' : ''">
            <router-link to="/admin/empresas">Empresas</router-link>
          </div>
        </div>
      </div>
    <router-view class="custom-pages"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeAdmin',
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
}

  .custom-items .item:hover {
    background-position: left;
    cursor: pointer;
  }

.custom-items .item a {
  color: black;
  display: block;
}

.selecionado {
  background: lightblue !important;
}
</style>