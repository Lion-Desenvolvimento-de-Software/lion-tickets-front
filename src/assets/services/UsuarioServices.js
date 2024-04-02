import axios from 'axios'
const api = '/api'

export default {
  async getUser(id) {
    const { data } = await axios.get(`${api}/usuario/${id}`);
    return data;
  },

  async GetUserAuthenticated() {
    try {
      const { data } = await axios.get(`/Account/GetUserAuthenticated`);
      return data;
    } catch(err) {
      if(err.response.status == 401) {
        return "Você não está logado!";
      }
    }
    
  },

  async hasUserName(userName) {
    console.log(userName)
    try {
      const { data } = await axios.get(`${api}/usuario/HasUserName/${userName}`);
      return data;
    } catch (err) {
      throw(err.response.data);
    }
  },
  
  async hasEmail(email) {
    try {
      const { data } = await axios.get(`${api}/usuario/hasEmail/${email}`);
      return data;
    } catch(err) {
      throw(err.response.data)
    }
  },

  async SendConfirmationEmail(email) {
    await axios.get(`${api}/usuario/SendConfirmationEmail/${email}`);
  },

  async post(userData) {
    var response = await axios.post(`/Account/Register`, userData);
    return response;
  },

  async login(dados) {
    try {
      var { data } = await axios.post(`/Account/login`, dados);
      return data;
    } catch(err) {
      console.log(err)
      throw err?.response?.data
    }
  },

  async logof() {
    await axios.post(`/Account/logof`);
  },

  async enviarConfirmacaoRedefinicaoSenha(email) {
    var response = await axios.get(`${api}/usuario/SendEmailRedefinicaoSenha/${email}`);
    return response;
  },
}