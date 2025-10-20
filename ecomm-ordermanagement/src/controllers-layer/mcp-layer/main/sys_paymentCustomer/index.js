module.exports = (headers) => {
  // Sys_paymentCustomer Db Object Rest Api Router
  const sys_paymentCustomerMcpRouter = [];

  // getPaymentCustomerByUserId controller
  sys_paymentCustomerMcpRouter.push(
    require("./get-paymentcustomerbyuserid-api")(headers),
  );
  // listPaymentCustomers controller
  sys_paymentCustomerMcpRouter.push(
    require("./list-paymentcustomers-api")(headers),
  );

  return sys_paymentCustomerMcpRouter;
};
