import axios from 'axios'
const api = '/api'

export default {
  getUser(id) {
    const { data } = axios.get(`${api}/usuario/${id}`);
    return data;
  },

  async GetUserAuthenticated() {
    const { data } = await axios.get(`${api}/usuario/GetUserAuthenticated`, {withCredentials: true});
    return data;
  },

  hasUserName(userName) {
    return axios.get(`${api}/usuario/HasUserName/${userName}`)
  },

  async post(userData) {
    var response = await axios.post(`${api}/usuario`, userData)
    console.log(response)
    return response
  },

  async login(dados) {
    await axios.post(`${api}/usuario/login`, dados);
  },

  async logof() {
    await axios.post(`${api}/usuario/logof`);
  }
}