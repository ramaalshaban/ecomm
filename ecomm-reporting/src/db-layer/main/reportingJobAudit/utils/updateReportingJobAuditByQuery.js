const { HttpServerError, BadRequestError } = require("common");

const { ReportingJobAudit } = require("models");
const { Op } = require("sequelize");

const updateReportingJobAuditByQuery = async (dataClause, query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    let rowsCount = null;
    let rows = null;

    const options = { where: { query, isActive: true }, returning: true };

    [rowsCount, rows] = await ReportingJobAudit.update(dataClause, options);

    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingReportingJobAuditByQuery",
      err,
    );
  }
};

module.exports = updateReportingJobAuditByQuery;
