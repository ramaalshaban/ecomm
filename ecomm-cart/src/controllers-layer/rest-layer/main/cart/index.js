const express = require("express");

// Cart Db Object Rest Api Router
const cartRouter = express.Router();

// add Cart controllers

// createCart controller
cartRouter.post("/v1/carts", require("./create-cart-api"));
// getCart controller
cartRouter.get("/v1/carts/:cartId", require("./get-cart-api"));
// updateCart controller
cartRouter.patch("/v1/carts/:cartId", require("./update-cart-api"));
// deleteCart controller
cartRouter.delete("/v1/carts/:cartId", require("./delete-cart-api"));
// listCarts controller
cartRouter.get("/v1/carts", require("./list-carts-api"));

module.exports = cartRouter;
