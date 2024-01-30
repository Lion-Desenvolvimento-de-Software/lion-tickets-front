<template>
  <div class="w-100 row row-cols-1 row-cols-md-3 g-4 mx-0 my-5">
    <div class="col">
      <div class="card" aria-hidden="true">
        <img src="https://picsum.photos/id/1045/800/450" class="card-img-top" alt="...">
        <div class="card-body placeholder-glow">
          <h5 class="card-title">{{nome}}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

          <slot class="placeholder-glow" name="botaoDetalhes"></slot>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'leyaoutCards',
  props: {
    nome: {
        type: String,
        default: ''
    },
    tipo: String
  },
}
</script>