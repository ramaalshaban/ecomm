const mainRouters = require("./main");

const sessionRouter = require("./session-router");

const { stripeDemoRouter, paymentMethodsRouter } = require("./checkout-router");

module.exports = {
  ...mainRouters,
  OrderManagementServiceRestController: require("./OrderManagementServiceRestController"),
  ...sessionRouter,

  stripeDemoRouter,
  paymentMethodsRouter,
};
