import axios from 'axios'
const api = '/api'

export default {
  getUser(id) {
    const { data } = axios.get(`${api}/usuario/${id}`);
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
    axios.post(`${api}/usuario/login`, dados).then(res => {
      return res;
    }).catch(err => {
      console.log('login: ', err);
      return err
    })
  }
}