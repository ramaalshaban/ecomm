module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    productMcpRouter: require("./product")(headers),
  };
};
