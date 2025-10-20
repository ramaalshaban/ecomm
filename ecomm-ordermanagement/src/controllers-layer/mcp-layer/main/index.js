module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    orderMcpRouter: require("./order")(headers),
    orderItemMcpRouter: require("./orderItem")(headers),
    sys_orderPaymentMcpRouter: require("./sys_orderPayment")(headers),
    sys_paymentCustomerMcpRouter: require("./sys_paymentCustomer")(headers),
    sys_paymentMethodMcpRouter: require("./sys_paymentMethod")(headers),
  };
};
