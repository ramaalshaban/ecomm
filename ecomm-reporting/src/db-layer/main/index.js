const salesReportFunctions = require("./salesReport");
const exportJobFunctions = require("./exportJob");
const reportingJobAuditFunctions = require("./reportingJobAudit");

module.exports = {
  // main Database
  createSalesReport: salesReportFunctions.createSalesReport,
  getIdListOfSalesReportByField:
    salesReportFunctions.getIdListOfSalesReportByField,
  getSalesReportById: salesReportFunctions.getSalesReportById,
  getSalesReportAggById: salesReportFunctions.getSalesReportAggById,
  getSalesReportListByQuery: salesReportFunctions.getSalesReportListByQuery,
  getSalesReportStatsByQuery: salesReportFunctions.getSalesReportStatsByQuery,
  getSalesReportByQuery: salesReportFunctions.getSalesReportByQuery,
  updateSalesReportById: salesReportFunctions.updateSalesReportById,
  updateSalesReportByIdList: salesReportFunctions.updateSalesReportByIdList,
  updateSalesReportByQuery: salesReportFunctions.updateSalesReportByQuery,
  deleteSalesReportById: salesReportFunctions.deleteSalesReportById,
  deleteSalesReportByQuery: salesReportFunctions.deleteSalesReportByQuery,
  dbScriptCreateSalesreport: salesReportFunctions.dbScriptCreateSalesreport,
  createExportJob: exportJobFunctions.createExportJob,
  getIdListOfExportJobByField: exportJobFunctions.getIdListOfExportJobByField,
  getExportJobById: exportJobFunctions.getExportJobById,
  getExportJobAggById: exportJobFunctions.getExportJobAggById,
  getExportJobListByQuery: exportJobFunctions.getExportJobListByQuery,
  getExportJobStatsByQuery: exportJobFunctions.getExportJobStatsByQuery,
  getExportJobByQuery: exportJobFunctions.getExportJobByQuery,
  updateExportJobById: exportJobFunctions.updateExportJobById,
  updateExportJobByIdList: exportJobFunctions.updateExportJobByIdList,
  updateExportJobByQuery: exportJobFunctions.updateExportJobByQuery,
  deleteExportJobById: exportJobFunctions.deleteExportJobById,
  deleteExportJobByQuery: exportJobFunctions.deleteExportJobByQuery,
  dbScriptCreateExportjob: exportJobFunctions.dbScriptCreateExportjob,
  dbScriptGetExportjob: exportJobFunctions.dbScriptGetExportjob,
  dbScriptListExportjobs: exportJobFunctions.dbScriptListExportjobs,
  createReportingJobAudit: reportingJobAuditFunctions.createReportingJobAudit,
  getIdListOfReportingJobAuditByField:
    reportingJobAuditFunctions.getIdListOfReportingJobAuditByField,
  getReportingJobAuditById: reportingJobAuditFunctions.getReportingJobAuditById,
  getReportingJobAuditAggById:
    reportingJobAuditFunctions.getReportingJobAuditAggById,
  getReportingJobAuditListByQuery:
    reportingJobAuditFunctions.getReportingJobAuditListByQuery,
  getReportingJobAuditStatsByQuery:
    reportingJobAuditFunctions.getReportingJobAuditStatsByQuery,
  getReportingJobAuditByQuery:
    reportingJobAuditFunctions.getReportingJobAuditByQuery,
  updateReportingJobAuditById:
    reportingJobAuditFunctions.updateReportingJobAuditById,
  updateReportingJobAuditByIdList:
    reportingJobAuditFunctions.updateReportingJobAuditByIdList,
  updateReportingJobAuditByQuery:
    reportingJobAuditFunctions.updateReportingJobAuditByQuery,
  deleteReportingJobAuditById:
    reportingJobAuditFunctions.deleteReportingJobAuditById,
  deleteReportingJobAuditByQuery:
    reportingJobAuditFunctions.deleteReportingJobAuditByQuery,
};
