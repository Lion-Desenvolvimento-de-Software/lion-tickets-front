import axios from "axios"

export default {
  async GetCartByUserId(userId) {
    const { data } = await axios.get(`/api/v1/cartAPI/${userId}`);
    return data;
  },
  async SaveCartAsync(cart, typeTicket) {
    const { data } = await axios.post('/api/v1/cartAPI', cart, { params: { typeTicket: typeTicket }, }, { headers: { 'Content-Type': 'application/json' } });
    return data;
  },
  async DeleteCartDetail(cartDetailId) {
    const { data } = await axios.delete(`/api/v1/cartAPI/${cartDetailId}`);
    return data;
  }
}