import axios from 'axios';

export default {
  async GetTicketsAsync(companyId, paginate = 0) {
    const { data } = await axios.get(`/api/v1/tickets/${companyId}/${Number.parseInt(paginate) - 1}`);
    return data;
  },

  async GetTicketByIdAsync(ticketId) {
    const { data } = await axios.get(`/api/v1/tickets/GetTicketById/${ticketId}`);
    return data;
  },
  
  async PostAsync(formData) {
    await axios.post("/api/v1/tickets", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  },

  async PutAsync(formData) {
    const { data } = await axios.put("/api/v1/tickets", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return data;
  },

  async DeleteAsync(ticketId) {
    const { data } = await axios.delete(`/api/v1/tickets/${ticketId}`);
    return data;
  }
}