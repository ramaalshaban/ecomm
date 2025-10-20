const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createSys_paymentCustomer: utils.createSys_paymentCustomer,
  getIdListOfSys_paymentCustomerByField:
    utils.getIdListOfSys_paymentCustomerByField,
  getSys_paymentCustomerById: utils.getSys_paymentCustomerById,
  getSys_paymentCustomerAggById: utils.getSys_paymentCustomerAggById,
  getSys_paymentCustomerListByQuery: utils.getSys_paymentCustomerListByQuery,
  getSys_paymentCustomerStatsByQuery: utils.getSys_paymentCustomerStatsByQuery,
  getSys_paymentCustomerByQuery: utils.getSys_paymentCustomerByQuery,
  updateSys_paymentCustomerById: utils.updateSys_paymentCustomerById,
  updateSys_paymentCustomerByIdList: utils.updateSys_paymentCustomerByIdList,
  updateSys_paymentCustomerByQuery: utils.updateSys_paymentCustomerByQuery,
  deleteSys_paymentCustomerById: utils.deleteSys_paymentCustomerById,
  deleteSys_paymentCustomerByQuery: utils.deleteSys_paymentCustomerByQuery,
  getSys_paymentCustomerByUserId: utils.getSys_paymentCustomerByUserId,
  getSys_paymentCustomerByCustomerId: utils.getSys_paymentCustomerByCustomerId,
  dbScriptGetPaymentcustomerbyuserid:
    dbApiScripts.dbScriptGetPaymentcustomerbyuserid,
  dbScriptListPaymentcustomers: dbApiScripts.dbScriptListPaymentcustomers,
};
