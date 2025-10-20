import axios from "axios";

import { CONFIG } from "src/global-config";

const authAxiosInstance = axios.create({ baseURL: CONFIG.authServiceUrl });

authAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default authAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await authAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const authEndpoints = {
  login: "/login",
  me: "/v1/users/:userId",
  logout: "/logout",

  user: {
    getUser: "/v1/users/:userId",

    updateUser: "/v1/users/:userId",

    registerUser: "/v1/registeruser",

    deleteUser: "/v1/users/:userId",

    listUsers: "/v1/users",

    updateUserRole: "/v1/userrole/:userId",

    updateUserPassword: "/v1/userpassword/:userId",

    getBriefUser: "/v1/briefuser/:userId",
  },
};
