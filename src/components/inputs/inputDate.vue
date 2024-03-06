<template>
  <div class="custom-input" :class="!IsValid ? 'invalid-input' : ''">
    <font-awesome-icon :class="ClassIcon" :icon="['fas',  'calendar-days']" />
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
}
input {
  background: transparent !important;
  border: 0;
  width: 13.5rem;
  height: 35px;
  color: #fff;
}

input:focus {
  outline: none;
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

svg {
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
}
</style>