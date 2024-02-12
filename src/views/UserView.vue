<template>
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
</template>

<script>
import Avatar from '@/components/avatar.vue'

export default {
  name: 'UserView',
  props: {
    usuario: null
  },
  components: {
    Avatar
  }
}
</script>

<style scoped>
.wreaper {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.custom-layout-numbers-seguidores-and-curtidas {
  display: flex;
  justify-content: space-evenly;
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