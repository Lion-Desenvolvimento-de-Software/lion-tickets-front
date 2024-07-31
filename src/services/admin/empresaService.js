import axios from "axios";

export default {
  async getEmpresas(pagination = 1) {
    try {
      var { data } = await axios.get(`api/v1/empresa/getAll/${pagination}`);
      return data;
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  async getEmpresasAll() {
    try {
      var { data } = await axios.get(`api/v1/empresa/getAll`);
      return data;
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  async GetCompanyByUserId(userId) {
    try {
      var { data } = await axios.get(`api/v1/UsersCompany/GetCompanyByUserId/${userId}`);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getUsersByUserId(userId) {
    try {
      var { data } = await axios.get(`api/v1/UsersCompany/GetUsersByUserId/${userId}`);
      return data;
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  async getCount() {
    try {
      var { data } = await axios.get(`api/v1/empresa/getCount`);
      return data;
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  async salvarEmpresa(obj) {
    await axios.post("api/v1/empresa", obj, { headers: { "Content-Type": "application/json" } });
  },

  async salvarUsuarioParaEmpresa(obj) {
    await axios.post("api/v1/UsersCompany", obj, { headers: { "Content-Type": "application/json" } })
  },

  async editarEmpresa(obj) {
    await axios.put("api/v1/empresa", obj, { headers: { "Content-Type": "application/json" } });
  },

  async UpdateEmpresa(obj) {
    await axios.put("api/v1/empresa", obj, { headers: { "Content-Type": "application/json" } })
  },
  async DeletarEmpresa(id) {
    await axios.delete(`api/v1/empresa/${id}`);
  },
  async RemoveUserOfCompany(userId) {
    await axios.delete(`api/v1/UsersCompany/${userId}`);
  }
}