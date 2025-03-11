import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

export async function isAuth() {
  const r = await axiosInstance.get("/me");
  return r.data;
}

export async function logoutUser() {
  const r = await axiosInstance.post("/logout");
  return r.data;
}
