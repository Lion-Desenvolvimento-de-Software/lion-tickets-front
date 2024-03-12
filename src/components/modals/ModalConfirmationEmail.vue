<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Confirme seu email</h5>
          <button type="button" style="border: none;" class="close" data-dismiss="modal" aria-label="Close" @click="hide">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Abra seu email e confirme sua conta para continuar!</p>
        </div>
        <div class="modal-footer">
          <button @click="hide" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
  mounted: () => {
    thisModalObj = new Modal($('#modal_aviso'));
  },
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