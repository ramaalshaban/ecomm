const productFunctions = require("./product");

module.exports = {
  // main Database
  createProduct: productFunctions.createProduct,
  getIdListOfProductByField: productFunctions.getIdListOfProductByField,
  getProductById: productFunctions.getProductById,
  getProductAggById: productFunctions.getProductAggById,
  getProductListByQuery: productFunctions.getProductListByQuery,
  getProductStatsByQuery: productFunctions.getProductStatsByQuery,
  getProductByQuery: productFunctions.getProductByQuery,
  updateProductById: productFunctions.updateProductById,
  updateProductByIdList: productFunctions.updateProductByIdList,
  updateProductByQuery: productFunctions.updateProductByQuery,
  deleteProductById: productFunctions.deleteProductById,
  deleteProductByQuery: productFunctions.deleteProductByQuery,
  getProductBySku: productFunctions.getProductBySku,
  dbScriptCreateProduct: productFunctions.dbScriptCreateProduct,
  dbScriptUpdateProduct: productFunctions.dbScriptUpdateProduct,
  dbScriptDeleteProduct: productFunctions.dbScriptDeleteProduct,
  dbScriptGetProduct: productFunctions.dbScriptGetProduct,
  dbScriptListProducts: productFunctions.dbScriptListProducts,
};
