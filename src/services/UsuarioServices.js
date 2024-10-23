import axios from 'axios'

export default {
  async GetUsers(pagination = 0, organizationId = 0) {
    try {
      const { data } = await axios.get(`/api/v1/usuario/${pagination}/${organizationId}`);
      return data;
    } catch (err) {
      console.log("GetUsers: ", err);
      throw err;
    }
  },

  async GetUsersById(userId) {
    try {
      const { data } = await axios.get(`/api/v1/usuario/GetUsuarioById/${userId}`);
      return data;
    } catch (err) {
      console.log("GetUsers: ", err);
      throw err;
    }
  },

  async Criar(dados) {
    const { data } = await axios.post('https://localhost:44360/account/registerAdmin', dados, { headers: { 'Content-Type': 'application/json' } });
    return data;
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
      axios.post(`https://localhost:44360/api/v1/users/DeletarUsuario/${id}`).then(async () => {
        const { data } = await axios.delete(`/api/v1/usuario/${id}`);
        return data;
      }).catch(err => {
        console.log("Delete: ", err);
        return "Houve um erro, tente novamente!";
      });
    } catch(err) {
      console.log('Delete: ', err);
      throw err;
    }
  }
}