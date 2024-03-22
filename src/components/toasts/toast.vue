<template>
  <div class="toast fade align-items-start custom-toast border-0 mt-3" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        {{ mensagem }}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { Toast } from 'bootstrap';
let thisToastObj = null;

export default {
  name: 'toast',
  mounted: () => {
    thisToastObj = new Toast($('#success'));
  },
  props: {
    mensagem: String
  },
  methods: {
    show() {
      thisToastObj.show();
    },
    hide() {
      thisToastObj.hide();
    }
  }
}
</script>

<style scoped>
.custom-toast {
  position: absolute;
  top: 0%;
}
</style>