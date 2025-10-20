const mainRouters = require("./main");

const sessionRouter = require("./session-router");

module.exports = {
  ...mainRouters,
  CartServiceRestController: require("./CartServiceRestController"),
  ...sessionRouter,
};
