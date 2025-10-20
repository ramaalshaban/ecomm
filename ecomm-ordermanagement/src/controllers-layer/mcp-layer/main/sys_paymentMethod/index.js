module.exports = (headers) => {
  // Sys_paymentMethod Db Object Rest Api Router
  const sys_paymentMethodMcpRouter = [];

  // listPaymentCustomerMethods controller
  sys_paymentMethodMcpRouter.push(
    require("./list-paymentcustomermethods-api")(headers),
  );

  return sys_paymentMethodMcpRouter;
};
