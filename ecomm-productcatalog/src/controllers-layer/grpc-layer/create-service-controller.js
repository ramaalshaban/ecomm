const ProductCatalogServiceGrpcController = require("./ProductCatalogServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new ProductCatalogServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
