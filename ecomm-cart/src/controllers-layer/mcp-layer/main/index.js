module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    cartMcpRouter: require("./cart")(headers),
    cartItemMcpRouter: require("./cartItem")(headers),
    koMcpRouter: require("./ko")(headers),
    bvfMcpRouter: require("./bvf")(headers),
  };
};
