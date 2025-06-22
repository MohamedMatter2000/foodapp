export const imageURL = "https://upskilling-egypt.com:3006/";
export const baseURL = "https://upskilling-egypt.com:3006/api/v1";
export const USER_URLS = {
  LOGIN: `/Users/Login`,
  REGISTER: `/Users/Register`,
  FORGET_PASSWORD: `/Users/Reset/Request`,
  RESET_PASSWORD: `/Users/Reset`,
  VERIFY_ACCOUNT: `/Users/verify`,
  CHANGE_PASSWORD: `/Users/ChangePassword`,
  GET_CURRENT_USER: "Users/currentUser",
  UPADTE_CURRENT_USER: "Users",
  GET_ALL_USER: `/Users`,
  GET_USER: (id) => `/Users/${id}`,
  GET_USER_BY_ID: (id) => `User/${id}`,
  DELETE_USER: (id) => `Users/${id}`,
};
export const RECEIPE_URL = {
  GET_RECIPE: "Recipe",
  GET_RECIPE_BY_ID: (id) => `Recipe/${id}`,
  DELETE_RECIPE: (id) => `Recipe/${id}`,
  UPDATE_RECIPE: (id) => `Recipe/${id}`,
  ADD_RECIPE: "Recipe",
};
export const CATEGORY_URL = {
  GET_CATOGERY: "Category",
  ADD_CATOGERY: "Category",
  DELETE_CATOGERY: (id) => `Category/${id}`,
  EDIT_CATOGERY: (id) => `Category/${id}`,
  GET_CATEGORY_BY_ID: (id) => `Category/${id}`,
};

export const USER_RECEIPE_URL = {
  GET_USER_RECIPE: "userRecipe",
  DELETE_USER_RECIPE: (id) => `userRecipe/${id}`,
  ADD_USER_RECIPE: "userRecipe",
};
export const TAG_URL = {
  GET_ALL_TAG: "tag/",
};
