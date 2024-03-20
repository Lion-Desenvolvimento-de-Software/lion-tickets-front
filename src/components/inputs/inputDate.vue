<template>
  <div class="custom-input" :class="!IsValid ? 'invalid-input' : ''">
    <input :id="Id" 
      type="date" 
      :name="Name"
      :required="Required"
      :value="model"
      @input="$emit('update:model', $event.target.value)" />
    <label :for="Id">{{ Label }}</label>
  </div>
</template>

<script>
export default {
  name: "inputDate",
  props: {
    Id: String,
    Name: String,
    Required: Boolean,
    ClassIcon: {
      type: String,
      default: () => ""
    },
    Label: String,
    IsValid: {
      type: Boolean,
      default: false
    },
    model: String
  },
  emits: ['update:model'],
}
</script>

<style scoped>
input::-ms-reveal,
input::-ms-clear {
  display: none;
}

.custom-input {
  position: relative;
  margin: 30px 0;
  max-width: 310px;
  border-bottom: 2px solid #fff;
  width: 100%;
}
input {
  background: transparent !important;
  border: 0;
  width: 100%;
  height: 35px;
  color: #fff;
  padding: 0 0 0 0.5rem;
}

input:focus {
  outline: none;
}

input::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

label {
  position: absolute;
  top: -5px;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.5s ease-in-out;
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px #6ff9d3 inset;
}

.invalid-input {
  border-bottom-color: red;
}
.error {
  color: red;
}
</style>