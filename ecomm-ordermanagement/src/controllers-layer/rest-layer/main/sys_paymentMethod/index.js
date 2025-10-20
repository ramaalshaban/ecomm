const express = require("express");

// Sys_paymentMethod Db Object Rest Api Router
const sys_paymentMethodRouter = express.Router();

// add Sys_paymentMethod controllers

// listPaymentCustomerMethods controller
sys_paymentMethodRouter.get(
  "/v1/paymentcustomermethods",
  require("./list-paymentcustomermethods-api"),
);

module.exports = sys_paymentMethodRouter;
