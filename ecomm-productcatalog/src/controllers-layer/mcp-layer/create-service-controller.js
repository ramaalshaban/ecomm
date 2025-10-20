const ProductCatalogServiceMcpController = require("./ProductCatalogServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new ProductCatalogServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
