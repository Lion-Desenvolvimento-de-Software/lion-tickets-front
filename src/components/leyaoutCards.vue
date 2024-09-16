<template>
  <div class="d-flex container-local">
    <div class="custom-card" v-for="item in itens" :key="item">
      <div class="img-box">
        <img :src="item.imageURL" alt="...">
      </div>
      <div class="custom-content">
        <h2>{{item.name}}</h2>
        <p>{{ item.description }}</p>
        <slot class="link-detalhes" name="botaoDetalhes" v-bind:item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'leyaoutCards',
  props: {
    // nome: {
    //     type: String,
    //     default: ''
    // },
    tipo: String,
    itens: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    background: #333333;
  }

  .container-local {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 100px 50px;
    padding: 100px 50px;
  }

  .container-local .custom-card {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
    max-width: 100%;
    height: 300px;
    background: #fff;
    border-radius: 20px;
    transition: 0.5s;
    box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
  }

  .container-local .custom-card:hover {
    height: 400px;
  }

  .container-local .custom-card .img-box {
    position: absolute;
    top: 20px;
    width: 300px;
    height: 220px;
    background: #333;
    border-radius: 12px;
    overflow: hidden;
    transition: 0.5s;
  }

  .container-local .custom-card:hover .img-box {
    top: -100px;
    scale: 0.75;
    box-shadow: 0 15px 75px rgba(0, 0, 0, 0.3);
  }

  .container-local .custom-card .img-box img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .container-local .custom-card .custom-content {
    position: absolute;
    top: 252px;
    width: 100%;
    height: 35px;
    padding: 0 35px;
    text-align: center;
    overflow: hidden;
    transition: 0.5s;
  }

  .container-local .custom-card:hover .custom-content {
    top: 130px;
    height: 250px;
  }

  .container-local .custom-card .custom-content h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333333;
  }

  .container-local .custom-card .custom-content p {
    padding-top: 2px;
    color: #333;
  }

  .container-local .custom-card .custom-content :slotted(a) {
    position: relative;
    top: 15px;
    display: inline-block;
    padding: 12px 25px;
    text-decoration: none;
    background: #181818;
    color: #fff;
    font-weight: 500;
  }

  .container-local .custom-card .custom-content :slotted(a):hover {
    opacity: 0.8;
  }

  @media (max-width: 400px) {
    .container-local .custom-card {
      width: 230px;
      border-radius: 15px;
    }

    .container-local .custom-card .img-box {
      width: 185px;
      border-radius: 10px;
    }

    .container-local .custom-card .custom-content p {
      font-size: 0.8rem;
    }

    .container-local .custom-card .custom-content :slotted(a) {
      font-size: 0.9rem;
    }
  }
</style>