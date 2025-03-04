import axios from "axios";

export const baseURL = "https://upskilling-egypt.com:3006/api/v1";

export const axiosInstances = axios.create({
  baseURL,
});
export const PrivateaxiosInstances = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});
export const USER_URLS = {
  LOGIN: `/Users/Login`,
  REGISTER: `/Users/Register`,
  FORGET_PASSWORD: `/Users/Reset/Request`,
  RESET_PASSWORD: `/Users/Reset`,
  VERIFY_ACCOUNT: `/Users/verify`,
  CHANGE_PASSWORD: `/Users/ChangePassword`,
  GET_USER: (id) => `/Users/${id}`,
};
export const RECEIPE_URL = {
  GET_RECIPE: "Recipe/?pageSize=10&pageNumber=1",
  DELETE_RECIPE: (id) => `Recipe/${id}`,
};
export const CATEGORY_URL = {
  GET_CATOGERY: "Category/?pageSize=10&pageNumber=1",
  DELETE_CATOGERY: (id) => `Category/${id}`,
};
