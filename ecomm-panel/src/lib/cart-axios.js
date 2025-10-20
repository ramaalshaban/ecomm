import axios from "axios";

import { CONFIG } from "src/global-config";

const cartAxiosInstance = axios.create({ baseURL: CONFIG.cartServiceUrl });

cartAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default cartAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await cartAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const cartEndpoints = {
  cart: {
    createCart: "/v1/carts",

    getCart: "/v1/carts/:cartId",

    updateCart: "/v1/carts/:cartId",

    deleteCart: "/v1/carts/:cartId",

    listCarts: "/v1/carts",
  },

  cartItem: {},

  ko: {},

  bvf: {},
};
