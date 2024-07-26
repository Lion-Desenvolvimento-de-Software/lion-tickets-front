import axios from 'axios'

export default {
  async GetUsers(role = "Admin") {
    try {
      const { data } = await axios.get(`https://localhost:44360/api/v1/users/GetUsers/${role}`);
      return data;
    } catch (err) {
      console.log("GetUsers: ", err);
      throw err;
    }
  },

  async GetUsersByIds(users) {
    try {
      const { data } = await axios.post(`https://localhost:44360/api/v1/users/GetUsersByIds`, users, { headers: { 'Content-Type': "application/json" } });
      return data;
    } catch (err) {
      console.log("GetUsers: ", err);
      throw err;
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
      const response = await axios.post('https://localhost:44360/account/UpdateUser', dados, { headers: { 'Content-Type': 'application/json' } });
      return response;
    } catch(err) {
      console.log('Criar', err);
      throw err;
    }
  },
  async Delete(id) {
    try {
      const { data } = await axios.post(`https://localhost:44360/api/v1/users/DeletarUsuario/${id}`);
      return data;
    } catch(err) {
      console.log('Delete: ', err);
      throw err;
    }
  }
}