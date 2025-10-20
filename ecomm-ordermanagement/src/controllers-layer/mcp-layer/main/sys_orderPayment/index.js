module.exports = (headers) => {
  // Sys_orderPayment Db Object Rest Api Router
  const sys_orderPaymentMcpRouter = [];

  // getOrderPayment2 controller
  sys_orderPaymentMcpRouter.push(require("./get-orderpayment2-api")(headers));
  // listOrderPayments2 controller
  sys_orderPaymentMcpRouter.push(require("./list-orderpayments2-api")(headers));
  // createOrderPayment controller
  sys_orderPaymentMcpRouter.push(require("./create-orderpayment-api")(headers));
  // updateOrderPayment controller
  sys_orderPaymentMcpRouter.push(require("./update-orderpayment-api")(headers));
  // deleteOrderPayment controller
  sys_orderPaymentMcpRouter.push(require("./delete-orderpayment-api")(headers));
  // listOrderPayments2 controller
  sys_orderPaymentMcpRouter.push(require("./list-orderpayments2-api")(headers));
  // getOrderPaymentByOrderId controller
  sys_orderPaymentMcpRouter.push(
    require("./get-orderpaymentbyorderid-api")(headers),
  );
  // getOrderPaymentByPaymentId controller
  sys_orderPaymentMcpRouter.push(
    require("./get-orderpaymentbypaymentid-api")(headers),
  );
  // getOrderPayment2 controller
  sys_orderPaymentMcpRouter.push(require("./get-orderpayment2-api")(headers));

  return sys_orderPaymentMcpRouter;
};
