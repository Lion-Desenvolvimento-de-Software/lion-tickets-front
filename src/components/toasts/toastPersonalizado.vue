<template>
  <div class="toast-general">
    <div class="custom-internal-toast">
      <div class="custom-title-toast">
        <h3>Aviso</h3>
        <vutton class="btn btn-transparent"><font-awesome-icon :icon="['fas', 'close']"></font-awesome-icon></vutton>
      </div>
      <div class="custom-info-toast">
        <span>Avisando!!!!</span>
      </div>
    </div>
    <b-progress height="2px" :value="50"></b-progress>
  </div>
</template>

<script>
export default {
  name: "ToastPersonalizado"
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
  animation: moveToast .2s;
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

@keyframes moveToast {
  0%   {left: 0; opacity: 0;}
  100% {left: 15px; opacity: 1;}
}
</style>