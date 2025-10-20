const mainFunctions = require("./main");

module.exports = {
  // main Database
  createSalesReport: mainFunctions.createSalesReport,
  getIdListOfSalesReportByField: mainFunctions.getIdListOfSalesReportByField,
  getSalesReportById: mainFunctions.getSalesReportById,
  getSalesReportAggById: mainFunctions.getSalesReportAggById,
  getSalesReportListByQuery: mainFunctions.getSalesReportListByQuery,
  getSalesReportStatsByQuery: mainFunctions.getSalesReportStatsByQuery,
  getSalesReportByQuery: mainFunctions.getSalesReportByQuery,
  updateSalesReportById: mainFunctions.updateSalesReportById,
  updateSalesReportByIdList: mainFunctions.updateSalesReportByIdList,
  updateSalesReportByQuery: mainFunctions.updateSalesReportByQuery,
  deleteSalesReportById: mainFunctions.deleteSalesReportById,
  deleteSalesReportByQuery: mainFunctions.deleteSalesReportByQuery,
  dbScriptCreateSalesreport: mainFunctions.dbScriptCreateSalesreport,
  createExportJob: mainFunctions.createExportJob,
  getIdListOfExportJobByField: mainFunctions.getIdListOfExportJobByField,
  getExportJobById: mainFunctions.getExportJobById,
  getExportJobAggById: mainFunctions.getExportJobAggById,
  getExportJobListByQuery: mainFunctions.getExportJobListByQuery,
  getExportJobStatsByQuery: mainFunctions.getExportJobStatsByQuery,
  getExportJobByQuery: mainFunctions.getExportJobByQuery,
  updateExportJobById: mainFunctions.updateExportJobById,
  updateExportJobByIdList: mainFunctions.updateExportJobByIdList,
  updateExportJobByQuery: mainFunctions.updateExportJobByQuery,
  deleteExportJobById: mainFunctions.deleteExportJobById,
  deleteExportJobByQuery: mainFunctions.deleteExportJobByQuery,
  dbScriptCreateExportjob: mainFunctions.dbScriptCreateExportjob,
  dbScriptGetExportjob: mainFunctions.dbScriptGetExportjob,
  dbScriptListExportjobs: mainFunctions.dbScriptListExportjobs,
  createReportingJobAudit: mainFunctions.createReportingJobAudit,
  getIdListOfReportingJobAuditByField:
    mainFunctions.getIdListOfReportingJobAuditByField,
  getReportingJobAuditById: mainFunctions.getReportingJobAuditById,
  getReportingJobAuditAggById: mainFunctions.getReportingJobAuditAggById,
  getReportingJobAuditListByQuery:
    mainFunctions.getReportingJobAuditListByQuery,
  getReportingJobAuditStatsByQuery:
    mainFunctions.getReportingJobAuditStatsByQuery,
  getReportingJobAuditByQuery: mainFunctions.getReportingJobAuditByQuery,
  updateReportingJobAuditById: mainFunctions.updateReportingJobAuditById,
  updateReportingJobAuditByIdList:
    mainFunctions.updateReportingJobAuditByIdList,
  updateReportingJobAuditByQuery: mainFunctions.updateReportingJobAuditByQuery,
  deleteReportingJobAuditById: mainFunctions.deleteReportingJobAuditById,
  deleteReportingJobAuditByQuery: mainFunctions.deleteReportingJobAuditByQuery,
};
