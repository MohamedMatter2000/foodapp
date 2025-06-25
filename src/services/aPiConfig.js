export const imageURL = "https://upskilling-egypt.com:3006/";
export const baseURL = "https://upskilling-egypt.com:3006/api/v1";
export const apiClient = async (endpoint, options = {}) => {
  const url = `${baseURL}${endpoint}`;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };
  if (options.body instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  const response = await fetch(url, config);
  const contentType = response.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  if (!response.ok) {
    const error = new Error(data?.message || `HTTP Error: ${response.status}`);
    error.status = response.status;
    error.response = { data, status: response.status };
    throw error;
  }
  return data;
};
