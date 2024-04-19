<template>
  <div class="colapse-geral">
    <div class="custom-colapse">
      <h1>Hello</h1>
      <div class="custom-items">
        <ul>
          <button><li>teste1</li></button>
          <button><li>teste2</li></button>
          <button><li>teste3</li></button>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "colapseProfile"
}
</script>

<style scoped>
.colapse-geral {
  right: 0;
  width: 200px;
  height: 100%;
  position: fixed;
  background: orange;
  z-index: 1200;

}

.custom-colapse {
  padding: 2em 0;
  margin: 1em 0 0 0;
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 25px;
  height: 100%;
  margin: 0 15px;
}

.custom-items {
  font-size: 18px;
}

.custom-items ul {
  margin: 0;
  padding: 0;
  display: grid;
  justify-items: center;
  gap: 5px;
}

.custom-items ul button {
  background-color: transparent;
  border: 0;
  width: 50%;
}

.custom-items ul li::after {
  content: '';
  display: block;
  height: 2px;
  width: 0;
  margin: auto;
  background-color: white;
  transition: width .5s ease;
}

.custom-items ul li {
  list-style: none;
}

.custom-items ul li:hover::after {
  cursor: pointer;
  width: 100%;
}

@keyframes linha-menu{
    0% {
        width: 0;
        height: 2px;
        border-bottom-color: transparent;
    }
    100% {
        width: 100%;
        height: 2px;
        border-bottom-color: #000;
    }
}
</style>