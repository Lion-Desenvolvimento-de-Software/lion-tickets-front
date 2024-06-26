import axios from "axios";

export default {
  async salvarEmpresa(obj) {
    var response = await axios.post("api/v1/empresa", obj, { headers: { "Content-Type": "application/json" } });
    console.log(response);
  }
}