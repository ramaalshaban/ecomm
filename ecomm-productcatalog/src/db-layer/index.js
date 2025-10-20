const mainFunctions = require("./main");

module.exports = {
  // main Database
  createProduct: mainFunctions.createProduct,
  getIdListOfProductByField: mainFunctions.getIdListOfProductByField,
  getProductById: mainFunctions.getProductById,
  getProductAggById: mainFunctions.getProductAggById,
  getProductListByQuery: mainFunctions.getProductListByQuery,
  getProductStatsByQuery: mainFunctions.getProductStatsByQuery,
  getProductByQuery: mainFunctions.getProductByQuery,
  updateProductById: mainFunctions.updateProductById,
  updateProductByIdList: mainFunctions.updateProductByIdList,
  updateProductByQuery: mainFunctions.updateProductByQuery,
  deleteProductById: mainFunctions.deleteProductById,
  deleteProductByQuery: mainFunctions.deleteProductByQuery,
  getProductBySku: mainFunctions.getProductBySku,
  dbScriptCreateProduct: mainFunctions.dbScriptCreateProduct,
  dbScriptUpdateProduct: mainFunctions.dbScriptUpdateProduct,
  dbScriptDeleteProduct: mainFunctions.dbScriptDeleteProduct,
  dbScriptGetProduct: mainFunctions.dbScriptGetProduct,
  dbScriptListProducts: mainFunctions.dbScriptListProducts,
};
