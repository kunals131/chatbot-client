import useAppStore from "@/store";
import axios from "axios";
import { ROUTES } from "../constants";
import cookies from "../functions/cookies";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/v1/api",
  timeout: 7000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = useAppStore.getState().authData.token;
    console.log("Token found", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       error.response.data.message.includes("Could not validate credentials")
//     ) {
//       // Call your logout function here
//       // useAppStore.getState().logout();

//       // Redirect to the login page
//       // if (window && window.location.href !== ROUTES.AUTH) {
//       //   window.location.href = ROUTES.AUTH;
//       }

//       return Promise.reject(error); // Reject the request to avoid further processing
//     }

//     return Promise.reject(error); // Pass through other errors
//   }
// );

export const createAuthenticatedAxiosInstance = (token: string) => {
  const instance = axios.create({
    baseURL: "http://localhost:8000/v1/api",
    timeout: 7000,
  });

  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return instance;
};
