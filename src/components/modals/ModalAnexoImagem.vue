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
              <span class="file-custom">{{ file?.name ?? 'Selecione um arquivo...' }}</span>
              <input type="file" accept="image/png, image/jpeg" @change="handleFileChange($event)">
            </div>
          </div>
          <div v-if="file">
            <cropper class="cropper"
                  :src="imageData.src"
                  :stancil-size="{
                    width: 300,
                    height: 300
                  }"
                  :stencil-props="{
                    handlers: {},
                    aspectRatio: 1
                  }"
                  :debounce="false"
                  ref="cropper"
                  @change="change" />

            <preview :width="120"
                    :height="120"
                    :image="result.image"
                    :coordinates="result.coordinates"
                    class="custom-preview" />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="hide" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="enviar" type="button" class="btn btn-success" data-dismiss="modal">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { Modal } from "bootstrap";

import 'vue-advanced-cropper/dist/theme.compact.css';

import { Cropper, Preview } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

let thisModalObj = null;

export default {
  name: 'ModalAnexoImagem',
  data() {
    return {
      file: null,
      cropper: null,
      imageData: {
        src: null,
        type: null
      },
      result: {
				coordinates: null,
				image: null
			}
    }
  },
  components: {
    Cropper,
    Preview,
  },
  mounted: () => {
    thisModalObj = new Modal($('#modal_anexo_imagem'));
  },
  methods: {
    show() {
      thisModalObj.show();
    },
    hide() {
      thisModalObj.hide();
      this.file = null;
      this.imageData.src = null;
      this.imageData.type = null;
    },
    handleFileChange(event) {
      if (event.target.files.length <= 0) return;
      this.file = event.target.files[0];
      const blob = URL.createObjectURL(event.target.files[0]);
      var reader = new FileReader();
      reader.onload = () => {
        this.imageData.src = blob;
        this.imageData.type = this.file.type
      };
      reader.readAsDataURL(this.file)
    },
    change({ coordinates, image }) {
      this.result = {
				coordinates,
				image
			};
		},
    enviar() {
      const result = this.$refs.cropper.getResult();
      this.imageData.src = result.canvas.toDataURL(this.imageData.type);
      this.$emit('salvar', { cropperResult: this.$refs.cropper, srcImage: this.imageData });
      this.hide();
    }
  }
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.custom-detail-file {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center
}

.custom-anexo-file {
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;
  height: 75%;
  margin: 0 50px;
  border: 1px solid #000;
  border-radius: 15px;
}

.custom-anexo-file span {
  position: absolute;
  left: 0;
  padding: 0 8px;
  height: 100%;
  width: calc(100% - 75px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  align-content: center;
}

.custom-anexo-file input {
  position: absolute;
  inset: 0;
  font-size: 20px;
  opacity: 0;
  height: 100%;
  width: 100%;
  text-decoration: none;
  display: inline-block;
}

.custom-anexo-file input::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.custom-anexo-file::before {
  content: "Anexar";
  padding: 7px 15px;
  background-color: #ccc;
  color: #333;
  height: 100%;
  position: absolute;
  right: 0;
}

.cropper {
	height: 400px;
	width: 600px;
	background: #DDD;
}

.custom-preview {
  border-radius: 50%;
  margin: 10px;
}
</style>