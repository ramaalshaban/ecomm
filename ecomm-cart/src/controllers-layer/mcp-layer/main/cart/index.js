module.exports = (headers) => {
  // Cart Db Object Rest Api Router
  const cartMcpRouter = [];

  // createCart controller
  cartMcpRouter.push(require("./create-cart-api")(headers));
  // getCart controller
  cartMcpRouter.push(require("./get-cart-api")(headers));
  // updateCart controller
  cartMcpRouter.push(require("./update-cart-api")(headers));
  // deleteCart controller
  cartMcpRouter.push(require("./delete-cart-api")(headers));
  // listCarts controller
  cartMcpRouter.push(require("./list-carts-api")(headers));

  return cartMcpRouter;
};
