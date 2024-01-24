<template>
  <div class="home container">
    <div class="error" v-if="Erros.length">
      <h3 class="d-flex justify-content-center">Dados não preenchidos corretamente:</h3>
      <ul>
        <li v-for="erro in Erros" v-bind:key="erro">{{ erro }}</li>
      </ul>
    </div>
    <div class="row g-3 justify-content-center m-2">
      <div class="col-md-8">
        <label for="email" class="form-label d-flex px-0 label-spacing">Email*:</label>
        <input id="email"
          type="text"
          name="Email"
          placeholder="Insira o seu email..." 
          v-model="email"
          class="form-control"
          required
        />
      </div>
    </div>
    <div class="row g-3 justify-content-center m-2">
      <div class="col-md-8">
        <label for="username" class="form-label d-flex px-0 label-spacing">Nome de usuário*:</label>
        <input id="username"
          type="text"
          name="Username"
          placeholder="Insira um nome de usuário..." 
          v-model="username"
          class="form-control"
        />
      </div>
    </div>
    <div class="row g-3 justify-content-center m-2">
      <div class="col-md-4">
        <label for="senha" class="form-label d-flex px-0 label-spacing">Senha*:</label>
        <input id="senha"
          type="password"
          name="Senha"
          placeholder="Insira a senha..." 
          v-model="senha"
          class="form-control"
        />
      </div>
      <div class="col-md-4">
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
    <div class="row g-3 justify-content-center m-2">
      <div class="col-md-2">
        <label for="genero" class="form-label d-flex px-0 label-spacing">Genero*:</label>
        <select id="genero" class="form-select" v-model="genero">
          <option selected :value="null">Selecione...</option>
          <option value="1">Masculino</option>
          <option value="2">Feminino</option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="cpf" class="form-label d-flex px-0 label-spacing">CPF*:</label>
        <input id="cpf"
              type="text" 
              name="cpf"
              class="form-control" 
              placeholder="informe seu CPF..." 
              maxlength="14"
              @keydown="cpfKeydown($event)" 
              v-model="cpf">
      </div>
    </div>
    <div class="row g-3 justify-content-center m-2">
      <div class="col-md-8">
        <label for="telefone" class="form-label d-flex px-0 label-spacing">Insira seu número*:</label>
        <input id="telefone"
          type="tel"
          name="Telefone"
          placeholder="Insira seu número..." 
          v-model="telefone"
          class="form-control"
        />
      </div>
    </div>
    <div class="row g-3 justify-content-center m-2">
      <div class="col-md-8 d-flex justify-content-end">
        <button :disabled="loading" class="btn btn-success" @click="NextStep">
          <div :class="loading ? 'spinner-border spinner-border-sm' : ''">
            <span class="visually-hidden">Loading...</span>
          </div>
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Usuario } from '@/assets/classes/Usuario';

export default {
  name: 'Cadastro',
  data() {
    return {
      username: null,
      email: null,
      senha: null,
      senhaConfirmacao: null,
      genero: null,
      cpf: null,
      telefone: null,

      Erros: [],
      loading: false
    }
  },

  watch: {
    cpf(newCpf) {
      newCpf = newCpf.replace(/[a-zA-Z]/gi, '');
      if(newCpf.length == 11 && !newCpf.includes('.') && !newCpf.includes('-')) this.cpf = newCpf.substring(0, 3) 
        + '.' 
        + newCpf.substring(3, 6) 
        + '.' 
        + newCpf.substring(6, 9) 
        + '-' 
        + newCpf.substring(9);
      else if(newCpf.length < 14) this.cpf = newCpf.replaceAll(".", "").replace('-', '');
    }
  },

  methods: {
    NextStep() {
      this.loading = true
      let usuario = new Usuario();
      usuario.AddData({
        UserName: this.username,
        Email: this.email,
        PasswordHash: this.senha,
        Cpf: this.cpf,
        Telefone: this.telefone,
        Genero: parseInt(this.genero)
      })
      this.Erros = usuario.checkForm()
      if(this.senha) {
        if(!this.senhaConfirmacao) this.Erros.push('Confirmação da senha não preenchida!');
        else if(this.senha !== this.senhaConfirmacao) this.Erros.push('Confirmação da senha inválida!');
      }
      if(this.Erros.length == 0) {
        usuario.hasUserName(this.username).then(res => {
          if(res?.response?.data) this.Erros.push(res?.response?.data)
          if(this.Erros.length == 0) {
            usuario.post().then(res => {
              console.log(res)
              this.$router.push('/login')
            }).catch(err => {
              console.log(err)
            }).finally(() => {
              this.loading = false;
            })
          }
        }).catch((err) => {
          console.log(err)
          this.loading = false;
        })
      } else {
        this.loading = false;
      }
    },
    cpfKeydown(e) {
      if (/^\W$/.test(e.key)) {
        e.preventDefault();
      }
    },
  }
}
</script>

<style>
.error {
  background-color: rgba(255, 0, 0, 0.1);
  text-align: start;
}
</style>