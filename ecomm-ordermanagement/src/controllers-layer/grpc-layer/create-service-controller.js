const OrderManagementServiceGrpcController = require("./OrderManagementServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new OrderManagementServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
