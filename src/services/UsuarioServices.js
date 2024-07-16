import axios from 'axios'

export default {
  async GetUsers(role = "Admin") {
    try {
      const { data } = await axios.get(`https://localhost:44360/api/v1/users/GetUsers/${role}`);
      return data;
    } catch (err) {
      console.log("GetUsers: ", err);
    }
  },

  async Criar(dados) {
    try {
      const { data } = await axios.post('https://localhost:44360/account/registerAdmin', dados, { headers: { 'Content-Type': 'application/json' } });
      return data;
    } catch(err) {
      console.log('Criar', err);
      throw err.response.data;
    }
  },
  async Update(dados) {
    try {
      console.log(dados);
      const response = await axios.post('https://localhost:44360/account/UpdateUser', dados, { headers: { 'Content-Type': 'application/json' } });
      return response;
    } catch(err) {
      console.log('Criar', err);
      throw err;
    }
  }
}