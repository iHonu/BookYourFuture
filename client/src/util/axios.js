import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BASE_SERVER_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
