const express = require("express");

// Order Db Object Rest Api Router
const orderRouter = express.Router();

// add Order controllers

// createOrder controller
orderRouter.post("/v1/orders", require("./create-order-api"));
// getOrder controller
orderRouter.get("/v1/orders/:orderId", require("./get-order-api"));
// updateOrder controller
orderRouter.patch("/v1/orders/:orderId", require("./update-order-api"));
// deleteOrder controller
orderRouter.delete("/v1/orders/:orderId", require("./delete-order-api"));
// listOrders controller
orderRouter.get("/v1/orders", require("./list-orders-api"));
// checkoutStartOrder controller
orderRouter.patch(
  "/v1/checkoutstartorder/:orderId",
  require("./checkout-startorder-api"),
);
// checkoutCompleteOrder controller
orderRouter.patch(
  "/v1/checkoutcompleteorder/:orderId",
  require("./checkout-completeorder-api"),
);
// checkoutRefreshOrder controller
orderRouter.patch(
  "/v1/checkoutrefreshorder/:orderId",
  require("./checkout-refreshorder-api"),
);

module.exports = orderRouter;
