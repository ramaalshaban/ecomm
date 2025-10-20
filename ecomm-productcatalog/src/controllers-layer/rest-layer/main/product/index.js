const express = require("express");

// Product Db Object Rest Api Router
const productRouter = express.Router();

// add Product controllers

// createProduct controller
productRouter.post("/v1/products", require("./create-product-api"));
// updateProduct controller
productRouter.patch("/v1/products/:productId", require("./update-product-api"));
// deleteProduct controller
productRouter.delete(
  "/v1/products/:productId",
  require("./delete-product-api"),
);
// getProduct controller
productRouter.get("/v1/products/:productId", require("./get-product-api"));
// listProducts controller
productRouter.get("/v1/products", require("./list-products-api"));

module.exports = productRouter;
