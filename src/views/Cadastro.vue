<template>
  <div class="home container">
    <div class="row g-3 justify-content-center mx-2">
      <div class="col-md-8">
        <label for="email" class="form-label d-flex px-0 label-spacing">Email:</label>
        <input id="email"
          type="text"
          name="Email"
          placeholder="Insira o seu email..." 
          v-model="dados['email']"
          class="form-control"
        />
      </div>
      <div class="col-md-6">
        <label for="senha" class="form-label d-flex px-0 label-spacing">Senha:</label>
        <input id="senha"
          type="password"
          name="Sena"
          placeholder="Insira a senha..." 
          v-model="dados['senha']"
          class="form-control"
        />
      </div>
      <div class="col-md-6">
        <label for="confirmeSenha" class="form-label d-flex px-0 label-spacing">Confirme a senha:</label>
        <input id="confirmeSenha"
          type="password"
          name="ConfirmacaoSenha"
          placeholder="Insira a senha..." 
          v-model="senhaConfirmacao"
          class="form-control"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cadastro',
  data() {
    return {
      dados: {},
      senhaConfirmacao: null
    }
  }
}
</script>