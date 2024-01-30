<template>
  <div>
    {{ usuario }}
    <h1>Hello!!</h1>
  </div>
</template>

<script>

export default {
  name: 'UserView',
  props: {
    usuario: null
  },
}
</script>