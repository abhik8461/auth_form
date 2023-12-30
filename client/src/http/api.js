import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const login = (data) => api.post("/login", data);
export const register = (data) => api.post("/register", data);
export const forgot = (data) => api.post("/forgot_password", data);
export const change = (data) => api.post("/change_password", data);
export const reset = (data) => api.get("/reset_password", data);
export const reverification = (data) => api.post("re_verification", data);

export default api;
