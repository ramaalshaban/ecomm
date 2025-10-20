const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createReportingJobAudit: utils.createReportingJobAudit,
  getIdListOfReportingJobAuditByField:
    utils.getIdListOfReportingJobAuditByField,
  getReportingJobAuditById: utils.getReportingJobAuditById,
  getReportingJobAuditAggById: utils.getReportingJobAuditAggById,
  getReportingJobAuditListByQuery: utils.getReportingJobAuditListByQuery,
  getReportingJobAuditStatsByQuery: utils.getReportingJobAuditStatsByQuery,
  getReportingJobAuditByQuery: utils.getReportingJobAuditByQuery,
  updateReportingJobAuditById: utils.updateReportingJobAuditById,
  updateReportingJobAuditByIdList: utils.updateReportingJobAuditByIdList,
  updateReportingJobAuditByQuery: utils.updateReportingJobAuditByQuery,
  deleteReportingJobAuditById: utils.deleteReportingJobAuditById,
  deleteReportingJobAuditByQuery: utils.deleteReportingJobAuditByQuery,
};
