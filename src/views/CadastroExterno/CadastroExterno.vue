<template>
  <div class="custom-container">
    <div class="custom-layout-boxs">
      <div class="custom-title">
        <font-awesome-icon :icon="['fas', 'user']" />
      </div>
      <div class="custom-form">
        <input-with-icon Id="userName"
                        Type="text"
                        Label="Nome de Usuário"
                        Name="userName"
                        :Required="true"
                        :Icon="['fas',  'user']"
                        :IsValid="isError ? false : true"
                        v-model:model="userName" />

        <select-with-icon Id="genero"
                          Label="Genero:"
                          :Required="true"
                          :IsValid="!genero ? false : true"
                          v-model:model="genero"
                          :options="[{'name': 'Masculino', 'value': 1}, {'name': 'Feminino', 'value': 2}]" />

        <input-date Id="dataAniversario"
                        Type="date"
                        Label="Data de Aniv."
                        Name="Data"
                        :Required="true"
                        :IsValid="!dataAniversario ? false : true"
                        v-model:model="dataAniversario" />
      </div>
      <button class="custom-button" @click="ActionForm">Finalizar Cadastro</button>
    </div>
  </div>
</template>

<script>
import UsuarioServices from '@/assets/services/UsuarioServices';
import inputWithIcon from '@/components/inputs/inputWithIcon.vue'
import selectWithIcon from '@/components/inputs/selectWithIcon.vue';
import inputDate from '@/components/inputs/inputDate.vue';

export default {
  name: "layoutLoginAndSignin",
  data() {
    return {
      senhaVisivel: false,
      senhaConfirmaVisivel: false,

      userName: '',
      senha: '',
      senhaConfirmada: '',
      genero: '',
      dataAniversario: '',
      isError: false,
    }
  },
  components: {
    inputWithIcon,
    selectWithIcon,
    inputDate
  },
  mounted() {
    console.log(this.$route.params.id)
    UsuarioServices.getUser(this.$route.params.id).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    
  }
}
</script>

<style scoped>
.custom-title {
  font-size: 3rem;
}

.custom-form {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.custom-button {
  width: auto;
  height: 2rem;
  color: #000;
  background: none;
  border: 1px solid #fff;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
}
.custom-button:hover {
  background: rgba(0, 0, 0, 0.1);
}
.custom-button:active {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5) inset;
}
.error {
  color: red;
}

.custom-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/images/background/wallpaper-leao.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.custom-layout-boxs {
  padding: 30px;
  box-shadow: 0 0 25px 0 rgb(255, 179, 144);
  backdrop-filter: blur(10px);
  color: #fff;
}
</style>