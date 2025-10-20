const express = require("express");

// Sys_orderPayment Db Object Rest Api Router
const sys_orderPaymentRouter = express.Router();

// add Sys_orderPayment controllers

// getOrderPayment2 controller
sys_orderPaymentRouter.get(
  "/v1/orderpayment2/:sys_orderPaymentId",
  require("./get-orderpayment2-api"),
);
// listOrderPayments2 controller
sys_orderPaymentRouter.get(
  "/v1/orderpayments2",
  require("./list-orderpayments2-api"),
);
// createOrderPayment controller
sys_orderPaymentRouter.post(
  "/v1/orderpayment",
  require("./create-orderpayment-api"),
);
// updateOrderPayment controller
sys_orderPaymentRouter.patch(
  "/v1/orderpayment/:sys_orderPaymentId",
  require("./update-orderpayment-api"),
);
// deleteOrderPayment controller
sys_orderPaymentRouter.delete(
  "/v1/orderpayment/:sys_orderPaymentId",
  require("./delete-orderpayment-api"),
);
// listOrderPayments2 controller
sys_orderPaymentRouter.get(
  "/v1/orderpayments2",
  require("./list-orderpayments2-api"),
);
// getOrderPaymentByOrderId controller
sys_orderPaymentRouter.get(
  "/v1/orderpaymentbyorderid/:sys_orderPaymentId",
  require("./get-orderpaymentbyorderid-api"),
);
// getOrderPaymentByPaymentId controller
sys_orderPaymentRouter.get(
  "/v1/orderpaymentbypaymentid/:sys_orderPaymentId",
  require("./get-orderpaymentbypaymentid-api"),
);
// getOrderPayment2 controller
sys_orderPaymentRouter.get(
  "/v1/orderpayment2/:sys_orderPaymentId",
  require("./get-orderpayment2-api"),
);

module.exports = sys_orderPaymentRouter;
