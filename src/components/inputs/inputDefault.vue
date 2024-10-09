<template>
  <div class="position-relative p-2">
    <input type="text" :id="id" :name="name" :placeholder="placeholder" >
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'inputDefault',
  props: {
    id: null,
    name: null,
    placeholder: null,
    label: null
  }
}
</script>

<style scoped>
input {
  position: relative;
  width: 100%;
  height: 30px;
  border-radius: 15px;
  padding: 0 8px;
  border: 1px solid;
}

label {
  position: absolute;
  left: 25px;
  top: 0;
  font-size: 11px;
  background-color: white;
  transition: .5s ease-out;
}

/* input:focus ~ label {
  background-color: transparent;
  top: -10px;
} */
</style>