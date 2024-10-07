<template>
  <div class="sidbar-geral">
    <div class="custom-fechar-sidbar" @click="$emit('fecharCollapse')">
      <span>X</span>
    </div>
    <div class="custom-sidbar">
      <div class="d-flex w-100 justify-content-center">
        <font-awesome-icon :icon="['fas', 'user']" style="height: 75px; width: 75px;" />
      </div>
      <div class="custom-items">
        <ul>
          <router-link @click="$emit('fecharCollapse')" :to="`/usuarios/${usuario?.Id}`"><li>Perfil</li></router-link>
        </ul>
        <hr/>
        <ul>
          <button @click="$emit('logof')"><li>Sair</li></button>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidbarProfile",
  props: {
    usuario: Object
  },
  computed: {
    getImagemPerfil() {
			return !this.usuario?.UrlImagemPerfil ? require("@/assets/images/R.png") : this.usuario?.UrlImagemPerfil;
		}
  },
  emits: ['fecharCollapse', 'logof'],
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}

.sidbar-geral {
  right: 0;
  width: 200px;
  height: 100%;
  position: fixed;
  background: orange;
  z-index: 1200;
  padding: 25px;
  transition: .5s;
}

.custom-sidbar {
  padding: 2em 0;
  margin: 1em 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: 100%;
  margin: 0 15px;
}

.custom-items {
  font-size: 18px;
}

.custom-items ul {
  margin: 0;
  padding: 0;
  display: grid;
  justify-items: center;
  gap: 5px;
}

.custom-items ul button {
  background-color: transparent;
  border: 0;
  width: 50%;
}

.custom-items ul li::after {
  content: '';
  display: block;
  height: 2px;
  width: 0;
  margin: auto;
  background-color: blue;
  transition: width .5s ease;
}

.custom-items ul li {
  list-style: none;
}

.custom-items ul li:hover::after {
  cursor: pointer;
  width: 100%;
}

.custom-fechar-sidbar {
  width: auto;
  height: auto;
  position: absolute;
  cursor: pointer;
}
.custom-fechar-sidbar span {
  font-size: 18px;
}

.custom-imagem-perfil {
  border-radius: 50%;
}
</style>