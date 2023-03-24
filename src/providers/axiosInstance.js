import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://bowllywood-8llo.onrender.com"
  baseURL: "http://localhost:5000/"
});

axiosInstance.interceptors.request.use(
  function (config) {
    const authHeaders = JSON.parse(localStorage.getItem("userTokens"));
    if (authHeaders) {
      config.headers["Authorization"] = "bearer " + authHeaders["token"];
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    if (!response.headers.Authorization) {
      // const authHeaders = JSON.parse(localStorage.getItem("userTokens")); // jamais utilisé dans cette fn ?
      response.headers.Authorization = localStorage.getItem("userTokens");
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
