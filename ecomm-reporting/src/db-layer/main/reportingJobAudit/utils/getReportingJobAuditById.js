const { HttpServerError } = require("common");

let { ReportingJobAudit } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getReportingJobAuditById = async (reportingJobAuditId) => {
  try {
    const reportingJobAudit = Array.isArray(reportingJobAuditId)
      ? await ReportingJobAudit.findAll({
          where: {
            id: { [Op.in]: reportingJobAuditId },
            isActive: true,
          },
        })
      : await ReportingJobAudit.findOne({
          where: {
            id: reportingJobAuditId,
            isActive: true,
          },
        });

    if (!reportingJobAudit) {
      return null;
    }
    return Array.isArray(reportingJobAuditId)
      ? reportingJobAudit.map((item) => item.getData())
      : reportingJobAudit.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReportingJobAuditById",
      err,
    );
  }
};

module.exports = getReportingJobAuditById;
