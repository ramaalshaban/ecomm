module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // Order Db Object
  CreateOrderManager: require("./order/create-order-api"),
  GetOrderManager: require("./order/get-order-api"),
  UpdateOrderManager: require("./order/update-order-api"),
  DeleteOrderManager: require("./order/delete-order-api"),
  ListOrdersManager: require("./order/list-orders-api"),
  CheckoutStartOrderManager: require("./order/checkout-startorder-api"),
  CheckoutCompleteOrderManager: require("./order/checkout-completeorder-api"),
  CheckoutRefreshOrderManager: require("./order/checkout-refreshorder-api"),
  // OrderItem Db Object
  // Sys_orderPayment Db Object
  GetOrderPayment2Manager: require("./sys_orderPayment/get-orderpayment2-api"),
  ListOrderPayments2Manager: require("./sys_orderPayment/list-orderpayments2-api"),
  CreateOrderPaymentManager: require("./sys_orderPayment/create-orderpayment-api"),
  UpdateOrderPaymentManager: require("./sys_orderPayment/update-orderpayment-api"),
  DeleteOrderPaymentManager: require("./sys_orderPayment/delete-orderpayment-api"),
  ListOrderPayments2Manager: require("./sys_orderPayment/list-orderpayments2-api"),
  GetOrderPaymentByOrderIdManager: require("./sys_orderPayment/get-orderpaymentbyorderid-api"),
  GetOrderPaymentByPaymentIdManager: require("./sys_orderPayment/get-orderpaymentbypaymentid-api"),
  GetOrderPayment2Manager: require("./sys_orderPayment/get-orderpayment2-api"),
  // Sys_paymentCustomer Db Object
  GetPaymentCustomerByUserIdManager: require("./sys_paymentCustomer/get-paymentcustomerbyuserid-api"),
  ListPaymentCustomersManager: require("./sys_paymentCustomer/list-paymentcustomers-api"),
  // Sys_paymentMethod Db Object
  ListPaymentCustomerMethodsManager: require("./sys_paymentMethod/list-paymentcustomermethods-api"),
};
