// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7233/api/Events",
});

export default api;
