<template>
  <div class="toast align-items-start custom-toast border-0 mt-3" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        {{ mensagem }}
      </div>
      <button @click="hide" type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'bootstrap';
var toast = null;

export default {
  name: 'toast',
  mounted: () => {
    toast = new Toast(document.getElementById('toastId'));
  },
  props: {
    mensagem: String,
  },
  methods: {
    show() {
      toast.show();
    },
    hide() {
      toast.hide();
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.custom-toast {
  position: absolute;
  top: 0%;
}

</style>