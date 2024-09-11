import axios from "axios"

export default {
  async GetProdutos(companyId, pagination = 0) {
    const { data } = await axios.get(`/api/v1/Product/${Number.parseInt(pagination) - 1}/${companyId}`);
    return data;
  },
  async GetProdutoById(id) {
    const { data } = await axios.get(`/api/v1/Product/${id}`);
    return data;
  },
  async SalvarProduto(data) {
    await axios.post('/api/v1/Product', data, { headers: { 'Content-Type': 'application/form-data' } });
  },
  async EditarProduto(dataProduct) {
    const { data } = await axios.put('/api/v1/Product', dataProduct, { headers: { 'Content-Type': 'application/form-data' } });
    return data;
  },
  async DeletarProduto(id) {
    try {
      await axios.delete(`/api/v1/Product/${id}`);
    } catch(err) {
      console.log(err);
    }
  }
}