const OrderManagementServiceRestController = require("./OrderManagementServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new OrderManagementServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
