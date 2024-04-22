<template>
  <div class="container custom-component-general my-5">
    <div class="wreaper h-100">
      <avatar class="mb-5"/>
      <div class="w-100">
        <h2>{{ usuario.UserName }}</h2>
        <p>{{ usuario.Email }}</p>
        <div class="custom-layout-numbers-seguidores-and-curtidas">
          <div class="d-grid">
            <span class="custom-number">0</span>
            <a>Seguidores</a>
          </div>
          <div class="d-grid">
            <span class="custom-number">0</span>
            <a>Seguindo</a>
          </div>
          <div class="d-grid">
            <span class="custom-number">0</span>
            <a>Curtidas</a>
          </div>
        </div>
      </div>
    </div>
    <edit-info-perfil :telefone="usuario.Telefone" />
    <div v-if="!isEdit" class="d-flex justify-content-center custom-button">
      <button class="button-success">Editar</button>
    </div>
    <div v-else class="d-flex justify-content-center custom-button">
      <button class="button-success">Salvar</button>
      <button class="button-cancel">Cancelar</button>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/avatar.vue'
import EditInfoPerfil from '@/components/editInfoPerfil.vue';

export default {
  name: 'UserView',
  props: {
    usuario: null
  },
  components: {
    Avatar,
    EditInfoPerfil
  },
  data: () => {
    return { 
      isEdit: false
    }
  }
}
</script>

<style scoped>

.custom-component-general {
  --bs-gutter-x: 0 !important;
}
.wreaper {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.custom-layout-numbers-seguidores-and-curtidas {
  display: flex;
  justify-content: space-evenly;
}

.custom-button button {
  background: none;
  width: 100px;
  height: 40px;
  max-width: 105px;
  max-height: 45px;
  padding: 4px 0px;
  border-radius: 15px;
  font-size: 18px;
  margin: 0 0.5em;
  transition: .5s ease-out;
}

.custom-button .button-success {
  border: 3px solid rgb(0, 150, 0);
  background: linear-gradient(to left, transparent 50%, rgb(0, 150, 0) 50%) right;
  background-size: 200%;
}

.custom-button .button-cancel {
  border: 3px solid rgb(150, 0, 0);
  background: linear-gradient(to left, transparent 50%, rgb(150, 0, 0) 50%) right;
  background-size: 200%;
}

.custom-button button:hover {
  background-position: left;
  width: 105px;
  height: 45px;
  transition: .5s ease-out
}

@media only screen and (max-width: 450px) {
  .wreaper {
    flex-wrap: wrap;
    justify-content: center;
  }

  .wreaper .box {
    left: 0;
  }
}

</style>