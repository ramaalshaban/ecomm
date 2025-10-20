const { HttpServerError } = require("common");

const { ReportingJobAudit } = require("models");
const { Op } = require("sequelize");

const updateReportingJobAuditByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await ReportingJobAudit.update(dataClause, options);
    const reportingJobAuditIdList = rows.map((item) => item.id);
    return reportingJobAuditIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingReportingJobAuditByIdList",
      err,
    );
  }
};

module.exports = updateReportingJobAuditByIdList;
