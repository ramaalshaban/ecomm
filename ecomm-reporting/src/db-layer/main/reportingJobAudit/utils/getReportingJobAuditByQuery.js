const { HttpServerError, BadRequestError } = require("common");

const { ReportingJobAudit } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getReportingJobAuditByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const reportingJobAudit = await ReportingJobAudit.findOne({
      where: query,
    });

    if (!reportingJobAudit) return null;
    return reportingJobAudit.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReportingJobAuditByQuery",
      err,
    );
  }
};

module.exports = getReportingJobAuditByQuery;
