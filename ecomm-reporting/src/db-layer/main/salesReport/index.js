const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createSalesReport: utils.createSalesReport,
  getIdListOfSalesReportByField: utils.getIdListOfSalesReportByField,
  getSalesReportById: utils.getSalesReportById,
  getSalesReportAggById: utils.getSalesReportAggById,
  getSalesReportListByQuery: utils.getSalesReportListByQuery,
  getSalesReportStatsByQuery: utils.getSalesReportStatsByQuery,
  getSalesReportByQuery: utils.getSalesReportByQuery,
  updateSalesReportById: utils.updateSalesReportById,
  updateSalesReportByIdList: utils.updateSalesReportByIdList,
  updateSalesReportByQuery: utils.updateSalesReportByQuery,
  deleteSalesReportById: utils.deleteSalesReportById,
  deleteSalesReportByQuery: utils.deleteSalesReportByQuery,
  dbScriptCreateSalesreport: dbApiScripts.dbScriptCreateSalesreport,
};
