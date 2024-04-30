<template>
  <div class="container custom-component-general my-5">
    <div class="wreaper h-100">
      <avatar class="mb-5" :urlImagemPerfil="urlImagemPerfil" @alterarImagem="$refs['modal-anexo-imagem'].show()"/>
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
    <edit-info-perfil :usuario="usuario" 
      ref="editInfo"
      v-model:phone-number="phoneNumber" 
      v-model:data-aniversario="dataAniversario" 
      v-model:genero="genero"
      :isEdit="isEdit" />
    <div v-if="!isEdit" class="d-flex justify-content-center custom-button">
      <button class="button-success" @click="isEdit = true">Editar</button>
    </div>
    <div v-else class="d-flex justify-content-center custom-button">
      <button class="button-success" @click="updated">Salvar</button>
      <button class="button-cancel" @click="cancelEdit">Cancelar</button>
    </div>
    <modal-anexo-imagem id="modal_anexo_imagem" ref="modal-anexo-imagem" />
  </div>
</template>

<script>
import Avatar from '@/components/avatar.vue'
import EditInfoPerfil from '@/components/editInfoPerfil.vue';
import UsuarioServices from '@/assets/services/UsuarioServices';
import ModalAnexoImagem from '@/components/modals/ModalAnexoImagem.vue';

export default {
  name: 'UserView',
  props: {
    usuario: Object,
    isUserYou: Boolean
  },
  components: {
    Avatar,
    EditInfoPerfil,
    ModalAnexoImagem
  },
  data: () => {
    return { 
      isEdit: false,
      phoneNumber: null,
      dataAniversario: null,
      genero: null,
      urlImagemPerfil: null
    }
  },
  beforeCreate() {
    console.log(this.isEdit)
  },
  created() {
    this.$watch(
      () => this.$route.params.Id,
      this.fetchData,
      { immediate: true }
    )
  },
  methods: {
    async fetchData(id) {
      try {
        var user = await UsuarioServices.getUserById(id);
        let obj = { PhoneNumber: user.phoneNumber, DataAniversario: user.dataAniversario, Genero: user.genero ?? 0 };
        this.addDataUser(obj);
        this.addImage(user.urlImagemPerfil);
      } catch(err) {
        console.log(err);
      }
    },
    async updated() {
      var obj = {
        PhoneNumber: this.phoneNumber,
        DataAniversario: this.dataAniversario,
        Genero: this.genero != 0 ? this.genero : null
      }
      this.usuario.AddData(obj);
      this.usuario.updated().then(res => {
        this.isEdit = false;
        this.$emit('setIsError', false);
        this.$emit('setMensagemToast', res);
        this.$emit('showToast');
      }).catch(err => {
        console.log(err)
      });
    },
    addDataUser(user) {
      this.phoneNumber = user.PhoneNumber;
      this.dataAniversario = user.DataAniversario.split("T")[0];
      this.genero = user.Genero;
    },
    addImage(url) {
      this.urlImagemPerfil = url;
    },
    cancelEdit() {
      this.isEdit = false;
      this.addDataUser(this.usuario);
    },
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