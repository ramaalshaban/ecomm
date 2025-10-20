module.exports = {
  OrderManagementServiceManager: require("./service-manager/OrderManagementServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // Order Db Object
  CreateOrderManager: require("./main/order/create-order-api"),
  GetOrderManager: require("./main/order/get-order-api"),
  UpdateOrderManager: require("./main/order/update-order-api"),
  DeleteOrderManager: require("./main/order/delete-order-api"),
  ListOrdersManager: require("./main/order/list-orders-api"),
  CheckoutStartOrderManager: require("./main/order/checkout-startorder-api"),
  CheckoutCompleteOrderManager: require("./main/order/checkout-completeorder-api"),
  CheckoutRefreshOrderManager: require("./main/order/checkout-refreshorder-api"),
  // OrderItem Db Object
  // Sys_orderPayment Db Object
  GetOrderPayment2Manager: require("./main/sys_orderPayment/get-orderpayment2-api"),
  ListOrderPayments2Manager: require("./main/sys_orderPayment/list-orderpayments2-api"),
  CreateOrderPaymentManager: require("./main/sys_orderPayment/create-orderpayment-api"),
  UpdateOrderPaymentManager: require("./main/sys_orderPayment/update-orderpayment-api"),
  DeleteOrderPaymentManager: require("./main/sys_orderPayment/delete-orderpayment-api"),
  ListOrderPayments2Manager: require("./main/sys_orderPayment/list-orderpayments2-api"),
  GetOrderPaymentByOrderIdManager: require("./main/sys_orderPayment/get-orderpaymentbyorderid-api"),
  GetOrderPaymentByPaymentIdManager: require("./main/sys_orderPayment/get-orderpaymentbypaymentid-api"),
  GetOrderPayment2Manager: require("./main/sys_orderPayment/get-orderpayment2-api"),
  // Sys_paymentCustomer Db Object
  GetPaymentCustomerByUserIdManager: require("./main/sys_paymentCustomer/get-paymentcustomerbyuserid-api"),
  ListPaymentCustomersManager: require("./main/sys_paymentCustomer/list-paymentcustomers-api"),
  // Sys_paymentMethod Db Object
  ListPaymentCustomerMethodsManager: require("./main/sys_paymentMethod/list-paymentcustomermethods-api"),
  integrationRouter: require("./integrations/testRouter"),
};
