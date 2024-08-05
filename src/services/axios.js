import axios from "axios"

export default {
  setAuthorization(access_token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
  }
}