const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createSys_orderPayment: utils.createSys_orderPayment,
  getIdListOfSys_orderPaymentByField: utils.getIdListOfSys_orderPaymentByField,
  getSys_orderPaymentById: utils.getSys_orderPaymentById,
  getSys_orderPaymentAggById: utils.getSys_orderPaymentAggById,
  getSys_orderPaymentListByQuery: utils.getSys_orderPaymentListByQuery,
  getSys_orderPaymentStatsByQuery: utils.getSys_orderPaymentStatsByQuery,
  getSys_orderPaymentByQuery: utils.getSys_orderPaymentByQuery,
  updateSys_orderPaymentById: utils.updateSys_orderPaymentById,
  updateSys_orderPaymentByIdList: utils.updateSys_orderPaymentByIdList,
  updateSys_orderPaymentByQuery: utils.updateSys_orderPaymentByQuery,
  deleteSys_orderPaymentById: utils.deleteSys_orderPaymentById,
  deleteSys_orderPaymentByQuery: utils.deleteSys_orderPaymentByQuery,
  getSys_orderPaymentByOrderId: utils.getSys_orderPaymentByOrderId,
  dbScriptGetOrderpayment2: dbApiScripts.dbScriptGetOrderpayment2,
  dbScriptListOrderpayments2: dbApiScripts.dbScriptListOrderpayments2,
  dbScriptCreateOrderpayment: dbApiScripts.dbScriptCreateOrderpayment,
  dbScriptUpdateOrderpayment: dbApiScripts.dbScriptUpdateOrderpayment,
  dbScriptDeleteOrderpayment: dbApiScripts.dbScriptDeleteOrderpayment,
  dbScriptListOrderpayments2: dbApiScripts.dbScriptListOrderpayments2,
  dbScriptGetOrderpaymentbyorderid:
    dbApiScripts.dbScriptGetOrderpaymentbyorderid,
  dbScriptGetOrderpaymentbypaymentid:
    dbApiScripts.dbScriptGetOrderpaymentbypaymentid,
  dbScriptGetOrderpayment2: dbApiScripts.dbScriptGetOrderpayment2,
};
