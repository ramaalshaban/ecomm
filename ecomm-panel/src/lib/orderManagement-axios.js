import axios from "axios";

import { CONFIG } from "src/global-config";

const orderManagementAxiosInstance = axios.create({
  baseURL: CONFIG.orderManagementServiceUrl,
});

orderManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default orderManagementAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await orderManagementAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const orderManagementEndpoints = {
  order: {
    createOrder: "/v1/orders",

    getOrder: "/v1/orders/:orderId",

    updateOrder: "/v1/orders/:orderId",

    deleteOrder: "/v1/orders/:orderId",

    listOrders: "/v1/orders",

    checkoutStartOrder: "/v1/checkoutstartorder/:orderId",

    checkoutCompleteOrder: "/v1/checkoutcompleteorder/:orderId",

    checkoutRefreshOrder: "/v1/checkoutrefreshorder/:orderId",
  },

  orderItem: {},

  sys_orderPayment: {
    getOrderPayment2: "/v1/orderpayment2/:sys_orderPaymentId",

    listOrderPayments2: "/v1/orderpayments2",

    createOrderPayment: "/v1/orderpayment",

    updateOrderPayment: "/v1/orderpayment/:sys_orderPaymentId",

    deleteOrderPayment: "/v1/orderpayment/:sys_orderPaymentId",

    getOrderPaymentByOrderId: "/v1/orderpaymentbyorderid/:sys_orderPaymentId",

    getOrderPaymentByPaymentId:
      "/v1/orderpaymentbypaymentid/:sys_orderPaymentId",
  },

  sys_paymentCustomer: {
    getPaymentCustomerByUserId:
      "/v1/paymentcustomerbyuserid/:sys_paymentCustomerId",

    listPaymentCustomers: "/v1/paymentcustomers",
  },

  sys_paymentMethod: {
    listPaymentCustomerMethods: "/v1/paymentcustomermethods",
  },
};
