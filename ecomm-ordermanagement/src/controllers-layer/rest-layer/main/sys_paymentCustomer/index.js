const express = require("express");

// Sys_paymentCustomer Db Object Rest Api Router
const sys_paymentCustomerRouter = express.Router();

// add Sys_paymentCustomer controllers

// getPaymentCustomerByUserId controller
sys_paymentCustomerRouter.get(
  "/v1/paymentcustomerbyuserid/:sys_paymentCustomerId",
  require("./get-paymentcustomerbyuserid-api"),
);
// listPaymentCustomers controller
sys_paymentCustomerRouter.get(
  "/v1/paymentcustomers",
  require("./list-paymentcustomers-api"),
);

module.exports = sys_paymentCustomerRouter;
