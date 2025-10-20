module.exports = {
  // main Database Crud Object Rest Api Routers
  orderRouter: require("./order"),
  orderItemRouter: require("./orderItem"),
  sys_orderPaymentRouter: require("./sys_orderPayment"),
  sys_paymentCustomerRouter: require("./sys_paymentCustomer"),
  sys_paymentMethodRouter: require("./sys_paymentMethod"),
};
