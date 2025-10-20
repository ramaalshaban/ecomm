const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createSys_paymentMethod: utils.createSys_paymentMethod,
  getIdListOfSys_paymentMethodByField:
    utils.getIdListOfSys_paymentMethodByField,
  getSys_paymentMethodById: utils.getSys_paymentMethodById,
  getSys_paymentMethodAggById: utils.getSys_paymentMethodAggById,
  getSys_paymentMethodListByQuery: utils.getSys_paymentMethodListByQuery,
  getSys_paymentMethodStatsByQuery: utils.getSys_paymentMethodStatsByQuery,
  getSys_paymentMethodByQuery: utils.getSys_paymentMethodByQuery,
  updateSys_paymentMethodById: utils.updateSys_paymentMethodById,
  updateSys_paymentMethodByIdList: utils.updateSys_paymentMethodByIdList,
  updateSys_paymentMethodByQuery: utils.updateSys_paymentMethodByQuery,
  deleteSys_paymentMethodById: utils.deleteSys_paymentMethodById,
  deleteSys_paymentMethodByQuery: utils.deleteSys_paymentMethodByQuery,
  getSys_paymentMethodByPaymentMethodId:
    utils.getSys_paymentMethodByPaymentMethodId,
  getSys_paymentMethodByUserId: utils.getSys_paymentMethodByUserId,
  getSys_paymentMethodByCustomerId: utils.getSys_paymentMethodByCustomerId,
  dbScriptListPaymentcustomermethods:
    dbApiScripts.dbScriptListPaymentcustomermethods,
};
