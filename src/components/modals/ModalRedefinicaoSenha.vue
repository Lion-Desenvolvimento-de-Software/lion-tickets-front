<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Redefinir Senha</h5>
          <button type="button" style="border: none;" class="close" data-dismiss="modal" aria-label="Close" @click="hide">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3 custom-input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">@</span>
            </div>
            <input v-model="email" type="email" class="form-control bg-light" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
          </div>
        </div>
        <div class="modal-footer">
          <button @click="hide" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="$emit('redefinirSenha',email)" type="button" class="btn btn-success" data-dismiss="modal">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { Modal } from "bootstrap";
let thisModalObj = null;

export default {
  name: 'ModalConfirmationEmail',
  data: () => {
    return {
      email: null
    }
  },
  mounted: () => {
    thisModalObj = new Modal($('#modal_redefinicao'));
  },
  emits: ['redefinirSenha'],
  methods: {
    show() {
      thisModalObj.show()
    },
    hide() {
      thisModalObj.hide()
    }
  }
}
</script>

<style scoped>
.custom-input-group {
  border: 1px solid #000;
}
</style>