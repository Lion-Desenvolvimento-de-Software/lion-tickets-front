import axios from 'axios'
const qs = require('qs')

const loginAsync = async (username, password) => {
  console.log(username, password)
  console.log(axios.defaults.baseURL);
  
  let data = qs.stringify({
    'grant_type': 'password',
    'client_id': 'lion_tickets_password',
    'client_secret': 'my_super_secret',
    'scope': 'openid profile lion_tickets',
    'username': username,
    'password': password
  })
  axios.post('https://localhost:44360/connect/token', data, { maxBodyLength: Infinity, headers: { "Content-Type": 'application/x-www-form-urlencoded' }}).then(res => {
    localStorage.setItem('token', res.data.access_token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`
  }).catch(err => {
    console.log(err.response.data.error_description)
  })
}

export default {
  loginAsync
}