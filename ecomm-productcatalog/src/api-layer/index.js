module.exports = {
  ProductCatalogServiceManager: require("./service-manager/ProductCatalogServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // Product Db Object
  CreateProductManager: require("./main/product/create-product-api"),
  UpdateProductManager: require("./main/product/update-product-api"),
  DeleteProductManager: require("./main/product/delete-product-api"),
  GetProductManager: require("./main/product/get-product-api"),
  ListProductsManager: require("./main/product/list-products-api"),
  integrationRouter: require("./integrations/testRouter"),
};
