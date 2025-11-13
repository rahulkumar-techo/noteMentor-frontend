import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// 🔐 Add token automatically for every request
// axiosInstance.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const root = localStorage.getItem("persist:root");

//     if (root) {
//       const auth = JSON.parse(root)?.auth;
//       const token = auth ? JSON.parse(auth)?.token : null;

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//   }
//   return config;
// });

export default axiosInstance;
