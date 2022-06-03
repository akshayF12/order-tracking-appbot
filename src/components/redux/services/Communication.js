import axios from "axios";
import config from "./config";
const Communication = {
  async getMethod(endpoint) {
    const response = await axios.get(config.baseUrl + endpoint);
    return response.data;
  },

  async getMethodSettings(endpoint, shopname) {
    try {
      const response = await axios.get(config.baseUrl + endpoint + shopname);

      return response.data;
    } catch (error) {
      return { error: true };
    }
  },

  async saveMethodsettings(endpoint, body) {
    const payload = body;
    try {
      const res = await axios.post(endpoint, JSON.stringify(payload));
      return res;
    } catch (error) {
      return { error: true };
    }
  },
};
export default Communication;
