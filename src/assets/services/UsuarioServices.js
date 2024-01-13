import axios from 'axios'
const api = '/api'

export default {
  getUser(id) {
    const { data } = axios.get(`${api}/usuario/${id}`);
    return data;
  },

  hasUserName(userName) {
    return axios.get(`${api}/usuario/hasUserName/${userName}`).then(() => {
      return false
    }).catch(err => {
      return err
    })
  },

  async post(userData) {
    axios.post(`${api}/usuario`, userData
    ).then(res => {
      return res
    }).catch(err => {
      console.log(err)
    })
  },

  async login(formData) {
    axios.post(`${api}/usuario/login`, formaData).then(res => {
      return res;
    }).catch(err => {
      console.log('login: ', err);
    })
  }
}