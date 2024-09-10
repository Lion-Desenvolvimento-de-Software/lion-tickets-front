import axios from 'axios';

export default {
  async GetTicketsAsync(companyId, paginate = 0) {
    const { data } = await axios.get(`/api/v1/tickets/${companyId}/${paginate}`);
    return data;
  },

  async GetTicketByIdAsync(ticketId) {
    const { data } = await axios.get(`/api/v1/tickets/GetTicketById/${ticketId}`);
    return data;
  },
  
  async PostAsync(data) {
    await axios.post("/api/v1/tickets", data, { headers: { 'Content-Type': 'application/form-data' } });
  },

  async PutAsync(data) {
    const { data } = await axios.put("/api/v1/tickets", data, { headers: { 'Content-Type': 'application/form-data' } });
    return data;
  },

  async DeleteAsync(ticketId) {
    const { data } = await axios.delete(`/api/v1/tickets/${ticketId}`);
    return data;
  }
}