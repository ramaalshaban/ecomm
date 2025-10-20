module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // Product Db Object
  CreateProductManager: require("./product/create-product-api"),
  UpdateProductManager: require("./product/update-product-api"),
  DeleteProductManager: require("./product/delete-product-api"),
  GetProductManager: require("./product/get-product-api"),
  ListProductsManager: require("./product/list-products-api"),
};
