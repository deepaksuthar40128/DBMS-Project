import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "/api/",
  withCredentials: true,
});
