<template>
  <div class="box">
    <button class="avatar" @click="evento">
      <img :src="urlImagemPerfil ?? require('@/assets/images/R.png')" alt="Imagem do Perfil" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    urlImagemPerfil: null
  },
  methods: {
    evento(e) {
      console.log(e.target)
    }
  }
}
</script>

<style scoped>
* {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.box {
  position: relative;
  width: 25%;
  top: 25px;
  left: 25px;
}
.avatar::after {
  opacity: 0;
  color: #fff;
  content: url("../assets/images/icons/photocamera.png");
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0,0,0,0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: 350ms ease-in-out;
}
.avatar:hover::after {
  opacity: 1;
}
.avatar:active::after {
  opacity: 0.75;
}
.avatar {
    box-sizing: border-box;
    border: 4px solid silver;
    border-radius: 50%;
}

.avatar img {
  border-radius: 50%;
}
</style>