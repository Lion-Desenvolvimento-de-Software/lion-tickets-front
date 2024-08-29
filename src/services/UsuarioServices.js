import axios from 'axios'

export default {
  async GetUsers(companyId, pagination = 0) {
    try {
      const { data } = await axios.get(`/api/v1/usuario/${pagination}/${companyId}`);
      return data;
    } catch (err) {
      console.log("GetUsers: ", err);
      throw err;
    }
  },

  async GetUsersByIds(users, pagination = 0) {
    try {
      const { data } = await axios.post(`/api/v1/users/GetUsersByIds/${pagination}`, users, { headers: { 'Content-Type': "application/json" } });
      return data;
    } catch (err) {
      console.log("GetUsers: ", err);
      throw err;
    }
  },

  async Criar(dados, usuario) {
    axios.post('https://localhost:44360/account/registerAdmin', dados, { headers: { 'Content-Type': 'application/json' } }).then(async () => {
      await axios.post("/api/v1/usuario", usuario, { headers: { 'Content-Type': 'application/json' } })
    }).catch(err => {
      console.log(err)
    });
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
      await axios.post(`/api/v1/users/DeletarUsuario/${id}`);
      await axios.delete(`/api/v1/usuario/${id}`)
    } catch(err) {
      console.log('Delete: ', err);
      throw err;
    }
  }
}