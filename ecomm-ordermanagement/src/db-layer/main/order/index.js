const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createOrder: utils.createOrder,
  getIdListOfOrderByField: utils.getIdListOfOrderByField,
  getOrderById: utils.getOrderById,
  getOrderAggById: utils.getOrderAggById,
  getOrderListByQuery: utils.getOrderListByQuery,
  getOrderStatsByQuery: utils.getOrderStatsByQuery,
  getOrderByQuery: utils.getOrderByQuery,
  updateOrderById: utils.updateOrderById,
  updateOrderByIdList: utils.updateOrderByIdList,
  updateOrderByQuery: utils.updateOrderByQuery,
  deleteOrderById: utils.deleteOrderById,
  deleteOrderByQuery: utils.deleteOrderByQuery,
  updateOrderOrderStatusById: utils.updateOrderOrderStatusById,
  dbScriptCreateOrder: dbApiScripts.dbScriptCreateOrder,
  dbScriptGetOrder: dbApiScripts.dbScriptGetOrder,
  dbScriptUpdateOrder: dbApiScripts.dbScriptUpdateOrder,
  dbScriptDeleteOrder: dbApiScripts.dbScriptDeleteOrder,
  dbScriptListOrders: dbApiScripts.dbScriptListOrders,
  dbScriptCheckoutStartorder: dbApiScripts.dbScriptCheckoutStartorder,
  dbScriptCheckoutCompleteorder: dbApiScripts.dbScriptCheckoutCompleteorder,
  dbScriptCheckoutRefreshorder: dbApiScripts.dbScriptCheckoutRefreshorder,
};
