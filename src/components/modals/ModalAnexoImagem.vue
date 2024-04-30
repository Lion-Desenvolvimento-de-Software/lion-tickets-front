<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-between">
          <h5 class="modal-title" id="exampleModalLongTitle">Adicionar uma imagem</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hide">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="custom-detail-file">
            <div class="custom-anexo-file">
              <input type="file" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="hide" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="$emit('reenviarCodigo', email)" type="button" class="btn btn-success" data-dismiss="modal">Enviar</button>
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
  name: 'ModalAnexoImagem',
  mounted: () => {
    thisModalObj = new Modal($('#modal_anexo_imagem'));
    thisModalObj.show();
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

<style scoped>

</style>