import axios from "axios";

export default {
  async getOrganizations(pagination = 1) {
    try {
      var { data } = await axios.get(`api/v1/Organization/getAll/${pagination}`);
      return data;
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  async getOrganizationById(id) {
    try {
      var { data } = await axios.get(`api/v1/Organization/${id}`);
      return data;
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  async getOrganizationsAll() {
    try {
      var { data } = await axios.get(`api/v1/Organization/getAll`);
      return data;
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  async GetOrganizationByUserId(userId) {
    try {
      var { data } = await axios.get(`api/v1/UsersOrganization/GetOrganizationByUserId/${userId}`);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getUsersByUserId(userId) {
    try {
      var { data } = await axios.get(`api/v1/UsersOrganization/GetUsersByUserId/${userId}`);
      return data;
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  async getCount() {
    try {
      var { data } = await axios.get(`api/v1/Organization/getCount`);
      return data;
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  async salvarOrganization(obj) {
    await axios.post("api/v1/Organization", obj, { headers: { "Content-Type": "application/json" } });
  },
  async SalvarImagemProfile(obj) {
    await axios.post("api/v1/Organization/SalvarImagemProfile", obj, { headers: { 'Content-Type': 'application/json' } });
  },

  async salvarUsuarioParaOrganization(obj) {
    await axios.post("api/v1/UsersOrganization", obj, { headers: { "Content-Type": "application/json" } })
  },

  async editarOrganization(obj) {
    await axios.put("api/v1/Organization", obj, { headers: { "Content-Type": "application/json" } });
  },

  async UpdateOrganization(obj) {
    await axios.put("api/v1/Organization", obj, { headers: { "Content-Type": "application/json" } })
  },
  async DeletarOrganization(id) {
    await axios.delete(`api/v1/Organization/${id}`);
  },
  async RemoveUserOfOrganization(userId) {
    await axios.delete(`api/v1/UsersOrganization/${userId}`);
  }
}