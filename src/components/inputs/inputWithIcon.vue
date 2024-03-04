<template>
  <div class="custom-input">
    <input :class="!IsValid ? 'invalid-input' : ''" 
      :id="Id" 
      :type="Type" 
      :name="Name" 
      :required="Required"
      :value="model"
      @input="$emit('update:model', $event.target.value)" />
    <label :for="Id">{{ Label }}</label>
    <font-awesome-icon :class="ClassIcon" :icon="Icon" @click="$emit('ViewPassword')" />
    <p v-if="messageError" class="error">{{ messageError }}</p>
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
    model: String,
    messageError: String
  },
  emits: ['update:model'],
  computed: {
    isValidEmail() {
      var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (!this.model)
          return '';
      return this.model.match(pattern) ? '' : 'invalid-input';
    },
    isPasswordValidLength() {
      if (!this.model)
          return '';
      return this.model.length > 5 ? '' : 'invalid-input';
    },
  }
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
  border-bottom: 2px solid #fff;
  width: 250px;
  height: 35px;
  padding: 0 2.5rem 0 0.5rem;
  color: #fff;
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
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px #6ff9d3 inset;
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
}
.invalid-input {
  border-bottom-color: red;
}
.error {
  color: red;
  margin: 0;
}
</style>