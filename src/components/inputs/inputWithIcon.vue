<template>
  <div class="custom-input">
    <input :class="!IsValid ? 'invalid-input' : _"
      :id="Id" 
      :type="Type" 
      :name="Name" 
      :required="Required"
      :value="model"
      @input="$emit('update:model', $event.target.value)" />
    <label :for="Id" :class="!IsValid ? 'ajuste-label' : _">{{ Label }}</label>
    <font-awesome-icon :class="ClassIcon" :icon="Icon" @click="$emit('ViewPassword')" />
  </div>
</template>

<script>
export default {
  name: "inputWithIcon",
  props: {
    Id: String,
    Type: String,
    Name: String,
    Required: Boolean,
    ClassIcon: {
      type: String,
      default: () => ""
    },
    Icon: {
      type: Array,
      default: () => ['fas', 'envelope']
    },
    Label: String,
    IsValid: {
      type: Boolean,
      default: false
    },
    model: String
  },
  emits: ['update:model', 'ViewPassword'],
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
}
input {
  background: transparent !important;
  border: 0;
  width: 250px;
  border-bottom: 2px solid #fff;
  height: 35px;
  padding: 0 2.5rem 0 0.5rem;
  color: #fff;
  transition: 1s ease-in-out;
}

input:focus {
  outline: none;
}

label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.5s ease-in-out;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 500000s ease-in-out 0s;
    -webkit-text-fill-color: #fff !important;
}
input:-webkit-autofill ~ label,
input:focus ~ label,
input:valid ~ label {
  top: -5px;
}

svg {
  position: absolute;
  font-size: 1.2rem;
  right: 0;
  top: 0.5rem;
  margin: 0 0.5rem;
}

.visionPassword {
  cursor: pointer;
  user-select: none;
}
.invalid-input {
  border-bottom-color: red;
}
</style>