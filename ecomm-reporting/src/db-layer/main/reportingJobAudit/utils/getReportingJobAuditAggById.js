const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { SalesReport, ExportJob, ReportingJobAudit } = require("models");
const { Op } = require("sequelize");

const getReportingJobAuditAggById = async (reportingJobAuditId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const reportingJobAudit = Array.isArray(reportingJobAuditId)
      ? await ReportingJobAudit.findAll({
          where: {
            id: { [Op.in]: reportingJobAuditId },
            isActive: true,
          },
          include: includes,
        })
      : await ReportingJobAudit.findOne({
          where: {
            id: reportingJobAuditId,
            isActive: true,
          },
          include: includes,
        });

    if (!reportingJobAudit) {
      return null;
    }

    const reportingJobAuditData =
      Array.isArray(reportingJobAuditId) && reportingJobAuditId.length > 0
        ? reportingJobAudit.map((item) => item.getData())
        : reportingJobAudit.getData();
    await ReportingJobAudit.getCqrsJoins(reportingJobAuditData);
    return reportingJobAuditData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReportingJobAuditAggById",
      err,
    );
  }
};

module.exports = getReportingJobAuditAggById;
