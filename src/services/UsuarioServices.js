import axios from 'axios'
const api = '/api'

export default {
  async getUserById(id) {
    const { data } = await axios.get(`${api}/usuario/${id}`);
    return data;
  },

  async GetUserAuthenticated() {
    try {
      axios.get('/api/v1/Product').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err);
      })
      // const response = await axios.get(`/api/v1/Product`);
      // console.log(response?.data)
      // return response?.data;
    } catch(err) {
      console.log(err)
    }
    
  },

  async hasUserName(userName) {
    try {
      const { data } = await axios.get(`${api}/usuario/HasUserName/${userName}`);
      return data;
    } catch (err) {
      throw(err.response.data);
    }
  },
  
  async hasEmail(email) {
    const { data } = await axios.get(`${api}/usuario/hasEmail/${email}`);
    return data;
  },

  async SendConfirmationEmail(email) {
    const { data } = await axios.get(`${api}/usuario/SendConfirmationEmail/${email}`);
    return data;
  },

  async register(userData) {
    try{
      var response = await axios.post(`/Account/Register`, userData);
      return response;
    } catch(err) {
      throw err.response.data
    }
  },

  async login(dados) {
    try {
      var { data } = await axios.post(`https://localhost:44360/Account/login`, dados);
      return data;
    } catch(err) {
      console.log(err)
      throw err?.response?.data
    }
  },

  async logof() {
    axios.post(`/Account/logof`).then(() => {
      localStorage.clear();
    }).catch(err => {
      console.log("logof: ", err)
    });
  },

  async enviarConfirmacaoRedefinicaoSenha(email) {
    var response = await axios.get(`${api}/usuario/SendEmailRedefinicaoSenha/${email}`);
    return response;
  },

  async confirmar_codigo_e_conta(email, code) {
    try {
      const { data } = await axios.post(`/Account/ConfirmarCodigoAndConta/${email}/${code}`);
      return data
    } catch(err) {
      throw err.response.data;
    }
  },

  async reenviarCodigo(emailReenvio, email) {
    try {
      const { data } = await axios.get(`${api}/Usuario/ReenviarCodigo/${email}/${emailReenvio}`);
      return data
    } catch(err) {
      throw err.response.data;
    }
  },

  async updated(obj) {
    const { data } = await axios.put(`${api}/usuario`, obj);
    return data;
  }
}