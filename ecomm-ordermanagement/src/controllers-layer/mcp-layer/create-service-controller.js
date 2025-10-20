const OrderManagementServiceMcpController = require("./OrderManagementServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new OrderManagementServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
