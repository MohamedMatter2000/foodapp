import axios from "axios";
import { baseURL } from "./APiconfig";

export const axiosInstances = axios.create({
  baseURL,
});
export const PrivateaxiosInstances = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});
