module.exports = {
  CreateOrderManager: require("./create-order-api"),
  GetOrderManager: require("./get-order-api"),
  UpdateOrderManager: require("./update-order-api"),
  DeleteOrderManager: require("./delete-order-api"),
  ListOrdersManager: require("./list-orders-api"),
  CheckoutStartOrderManager: require("./checkout-startorder-api"),
  CheckoutCompleteOrderManager: require("./checkout-completeorder-api"),
  CheckoutRefreshOrderManager: require("./checkout-refreshorder-api"),
};
