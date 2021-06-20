import axios from "axios";

const baseDomain = process.env.VUE_APP_API_BASE_URL;

const baseURL = `${baseDomain}/api`;

export default axios.create({
  baseURL: baseURL,
});
