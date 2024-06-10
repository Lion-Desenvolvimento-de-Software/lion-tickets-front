<template>
  <h1>{{ getTitle }}</h1>
</template>

<script>
export default {
  name: "loginAdmin",
  data: () => {
    return {
      title: ""
    }
  },

  created() {
    this.title = "Hello World";
  },

  computed: {
    getTitle() {
      return this.title;
    }
  }
}
</script>