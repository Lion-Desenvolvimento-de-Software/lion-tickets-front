<template>
  <div class="custom-select">
    <label>{{ Label }}</label>
    <select :id="Id" 
      :name="Name" 
      :required="Required"
      :class="key != 0 ? '' : 'invalid-input'"
      @change="onChange($event)"
      v-model="key" >
      <option :value="0" selected>Selecione...</option>
      <option :value="option.value" v-for="option in options" :key="option">{{ option.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'selectWithIcon',
  emits: ['update:model'],
  data: () => {
    return {
      key: 0
    }
  },
  props: {
    Id: String,
    Name: String,
    Required: Boolean,
    Icon: {
      type: Array,
      default: () => ['fas', 'envelope']
    },
    Label: String,
    model: String,
    messageError: String,
    options: {
      type: Array,
      default: () => [{}]
    }
  },
  methods: {
    onChange(event) {
      this.key = event.target.value;
      this.$emit("update:model", event.target.value)
    }
  }
}
</script>

<style scoped>
select::-ms-reveal,
select::-ms-clear {
  display: none;
}
.custom-select {
  position: relative;
  margin: 30px 0;
  max-width: 310px;
}
select {
  background: transparent !important;
  border: 0;
  border-bottom: 2px solid #fff;
  width: 250px;
  height: 35px;
  padding: 0 2.5rem 0 0.5rem;
  color: #fff;
}

select option {
  color: black;
}

label {
  position: absolute;
  left: 5px;
  font-size: 1rem;
  pointer-events: none;
  top: -20px;
}
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px #6ff9d3 inset;
}

select:focus {
  outline: none;
}

svg {
  position: absolute;
  font-size: 1.2rem;
  right: 0;
  top: 0.5rem;
  margin: 0 0.5rem;
}

.invalid-input {
  border-bottom-color: red;
}
.error {
  color: red;
  margin: 0;
}
</style>