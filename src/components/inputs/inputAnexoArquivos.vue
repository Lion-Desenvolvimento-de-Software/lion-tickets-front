<template>
  <div class="custom-detail-file" :class="classStyle">
    <div class="custom-anexo-file">
      <span class="file-custom">{{ getNameOfTheFiles ?? 'Selecione um arquivo...' }}</span>
      <input type="file" :multiple="multiple" :accept="accept" @change="handleFileChange($event)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputAnexoArquivos',
  data() {
    return {
      files: []
    }
  },
  emits: ['handleFiles'],
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: 'image/png, image/jpeg'
    },
    classStyle: null
  },
  computed: {
    getNameOfTheFiles() {
      let fileList = [];
      if (this.files?.length > 0) {
        for (let index = 0; index < this.files.length; index++) {
          fileList.push(this.files[index]?.name);
          
        }
        return fileList.join();
      }
      return null;
    }
  },
  methods: {
    handleFileChange(event) {
      if (event.target.files.length <= 0) return;
      this.files = event.target.files;

      this.$emit('handleFiles', this.files);

      // const blob = URL.createObjectURL(event.target.files[0]);
      // var reader = new FileReader();
      // reader.onload = () => {
      //   this.imageData.src = blob;
      //   this.imageData.type = this.file.type
      // };
      // reader.readAsDataURL(this.file)
    },
  }
}
</script>

<style scoped>
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
</style>