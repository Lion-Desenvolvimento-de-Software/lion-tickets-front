import axios from "axios";

export default {
  async getEmpresas(pagination = 1) {
    var { data } = await axios.get(`api/v1/empresa/getAll/${pagination}`);
    return data;
  },

  async getCount() {
    var { data } = await axios.get(`api/v1/empresa/getCount`);
    return data;
  },

  async salvarEmpresa(obj) {
    await axios.post("api/v1/empresa", obj, { headers: { "Content-Type": "application/json" } });
  },

  async editarEmpresa(obj) {
    await axios.put("api/v1/empresa", obj, { headers: { "Content-Type": "application/json" } });
  },

  async UpdateEmpresa(obj) {
    await axios.put("api/v1/empresa", obj, { headers: { "Content-Type": "application/json" } })
  },
  async DeletarEmpresa(id) {
    await axios.delete(`api/v1/empresa/${id}`);
  }
}