import axios from 'axios'

const http = createInstance('http://localhost:44361')

function createInstance(baseURL) {
  return axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    }
  });
}

export default {
  http
}