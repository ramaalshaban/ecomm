const { HttpServerError, BadRequestError } = require("common");

const { ReportingJobAudit } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getReportingJobAuditListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const reportingJobAudit = await ReportingJobAudit.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!reportingJobAudit || reportingJobAudit.length === 0) return [];

    //      if (!reportingJobAudit || reportingJobAudit.length === 0) {
    //      throw new NotFoundError(
    //      `ReportingJobAudit with the specified criteria not found`
    //  );
    //}

    return reportingJobAudit.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReportingJobAuditListByQuery",
      err,
    );
  }
};

module.exports = getReportingJobAuditListByQuery;
