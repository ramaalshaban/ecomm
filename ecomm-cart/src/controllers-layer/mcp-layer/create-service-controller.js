const CartServiceMcpController = require("./CartServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new CartServiceMcpController(name, routeName, params);
  return mcpController;
};
