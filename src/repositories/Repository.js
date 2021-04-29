import axios from "axios";
import store from "../store/store"

const baseDomain = "http://127.0.0.1:8000";

const baseURL = `${baseDomain}/api`;

export default axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${store.state.token}`,
  },
});
