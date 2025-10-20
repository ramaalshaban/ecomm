const ProductCatalogServiceRestController = require("./ProductCatalogServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new ProductCatalogServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
