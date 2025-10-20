const CartServiceGrpcController = require("./CartServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new CartServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
