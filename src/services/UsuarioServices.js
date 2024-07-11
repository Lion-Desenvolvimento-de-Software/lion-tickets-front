import axios from 'axios'

export default {
  async GetUsers(role = "Admin") {
    try {
      const { data } = await axios.get(`https://localhost:44360/api/v1/users/GetUsers/${role}`);
      return data;
    } catch (err) {
      console.log("GetUsers: ", err);
    }
  }
}