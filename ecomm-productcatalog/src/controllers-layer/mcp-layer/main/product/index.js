module.exports = (headers) => {
  // Product Db Object Rest Api Router
  const productMcpRouter = [];

  // createProduct controller
  productMcpRouter.push(require("./create-product-api")(headers));
  // updateProduct controller
  productMcpRouter.push(require("./update-product-api")(headers));
  // deleteProduct controller
  productMcpRouter.push(require("./delete-product-api")(headers));
  // getProduct controller
  productMcpRouter.push(require("./get-product-api")(headers));
  // listProducts controller
  productMcpRouter.push(require("./list-products-api")(headers));

  return productMcpRouter;
};
