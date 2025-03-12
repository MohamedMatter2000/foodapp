import axios from "axios";
import { baseURL } from "./apiConfig";

export const axiosInstances = axios.create({
  baseURL,
});
export const PrivateaxiosInstances = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});
