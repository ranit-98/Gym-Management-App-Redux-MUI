import axios from "axios";

let axiosInstance=axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

axiosInstance.interceptors.request.use(
    async function (config) {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
          // config.headers["Content-Type"] = "application/json; charset=utf-8";
        if (token !== null || token !== undefined) {
          config.headers["x-access-token"] = token;
         
        }
        return config;
      },
      function (err) {
        return Promise.reject(err);
      }
)

export default axiosInstance