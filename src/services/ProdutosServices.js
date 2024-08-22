import axios from "axios"

export default {
  async GetProdutos(pagination) {
    const { data } = await axios.get(`/api/v1/Product/${Number.parseInt(pagination) - 1}`);
    return data;
  },
  async GetProdutoById(id) {
    const { data } = await axios.get(`/api/v1/Product/${id}`);
    return data;
  },
  async SalvarProduto(data) {
    await axios.post('/api/v1/Product', data, { headers: { 'Content-Type': 'application/form-data' } });
  },
  async AtualizarProduto(data) {
    await axios.put('/api/v1/Product', data, { headers: { 'Content-Type': 'application/json' } });
  },
  async DeletarProduto(id) {
    try {
      await axios.delete(`/api/v1/Product/${id}`);
    } catch(err) {
      console.log(err);
    }
  }
}