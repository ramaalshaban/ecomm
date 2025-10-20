import axios from "axios";

import { CONFIG } from "src/global-config";

const productCatalogAxiosInstance = axios.create({
  baseURL: CONFIG.productCatalogServiceUrl,
});

productCatalogAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default productCatalogAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await productCatalogAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const productCatalogEndpoints = {
  product: {
    createProduct: "/v1/products",

    updateProduct: "/v1/products/:productId",

    deleteProduct: "/v1/products/:productId",

    getProduct: "/v1/products/:productId",

    listProducts: "/v1/products",
  },
};
