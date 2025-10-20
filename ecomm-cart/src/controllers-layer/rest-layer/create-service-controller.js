const CartServiceRestController = require("./CartServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new CartServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
