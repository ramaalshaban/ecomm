const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createProduct: utils.createProduct,
  getIdListOfProductByField: utils.getIdListOfProductByField,
  getProductById: utils.getProductById,
  getProductAggById: utils.getProductAggById,
  getProductListByQuery: utils.getProductListByQuery,
  getProductStatsByQuery: utils.getProductStatsByQuery,
  getProductByQuery: utils.getProductByQuery,
  updateProductById: utils.updateProductById,
  updateProductByIdList: utils.updateProductByIdList,
  updateProductByQuery: utils.updateProductByQuery,
  deleteProductById: utils.deleteProductById,
  deleteProductByQuery: utils.deleteProductByQuery,
  getProductBySku: utils.getProductBySku,
  dbScriptCreateProduct: dbApiScripts.dbScriptCreateProduct,
  dbScriptUpdateProduct: dbApiScripts.dbScriptUpdateProduct,
  dbScriptDeleteProduct: dbApiScripts.dbScriptDeleteProduct,
  dbScriptGetProduct: dbApiScripts.dbScriptGetProduct,
  dbScriptListProducts: dbApiScripts.dbScriptListProducts,
};
