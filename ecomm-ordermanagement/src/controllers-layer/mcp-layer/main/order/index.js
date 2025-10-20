module.exports = (headers) => {
  // Order Db Object Rest Api Router
  const orderMcpRouter = [];

  // createOrder controller
  orderMcpRouter.push(require("./create-order-api")(headers));
  // getOrder controller
  orderMcpRouter.push(require("./get-order-api")(headers));
  // updateOrder controller
  orderMcpRouter.push(require("./update-order-api")(headers));
  // deleteOrder controller
  orderMcpRouter.push(require("./delete-order-api")(headers));
  // listOrders controller
  orderMcpRouter.push(require("./list-orders-api")(headers));
  // checkoutStartOrder controller
  orderMcpRouter.push(require("./checkout-startorder-api")(headers));
  // checkoutCompleteOrder controller
  orderMcpRouter.push(require("./checkout-completeorder-api")(headers));
  // checkoutRefreshOrder controller
  orderMcpRouter.push(require("./checkout-refreshorder-api")(headers));

  return orderMcpRouter;
};
