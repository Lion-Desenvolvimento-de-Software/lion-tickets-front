<template>
  <div class="toast-general" :class="classToast" id="toast-animation" v-if="show">
    <div class="custom-internal-toast">
      <div class="custom-title-toast">
        <h3>Aviso</h3>
        <vutton class="btn btn-transparent"><font-awesome-icon :icon="['fas', 'close']"></font-awesome-icon></vutton>
      </div>
      <div class="custom-info-toast">
        <span @click="getMessage">Avisando!!!!</span>
      </div>
    </div>
    <b-progress height="2px" :value="progress" :max="100"></b-progress>
  </div>
</template>

<script>
export default {
  name: "ToastPersonalizado",
  data: () => {
    return {
      progress: 0,
      show: false,
      classToast: null
    }
  },
  methods: {
    showToast() {
      this.classToast = 'toast-enter-animation';
      this.show = true;
      var myInterval = setInterval(() => {
        this.progress+=5;
        if (this.progress >= 100) {
          this.classToast = 'toast-exit-animation'
          setTimeout(() => {
            clearInterval(myInterval);
            this.show = false;
            this.progress = 0;
          }, 200)
        }
      }, 300)
      setTimeout(() => {
        
        
      }, 5000);
    }
  }
}
</script>

<style scoped>
.toast-general {
  position: fixed;
  width: 250px;
  max-width: 100%;
  background-color: rgba(238, 255, 0, 0.8);
  background-clip: padding-box;
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
  border-radius: .25rem;
  top: 0;
  margin: 15px;
  z-index: 700;
}

.custom-internal-toast {
  padding: 10px;
}

.custom-title-toast {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  margin: 0 0 15px 0;
}

.toast-enter-animation {
  animation: moveToast .2s;
}

.toast-exit-animation {
  animation: moveExitToast .2s;
}

@keyframes moveToast {
  0%   {left: 0; opacity: 0;}
  100% {left: 15px; opacity: 1;}
}

@keyframes moveExitToast {
  0%   {left: 15px; opacity: 1;}
  100% {left: 0; opacity: 0;}
}
</style>