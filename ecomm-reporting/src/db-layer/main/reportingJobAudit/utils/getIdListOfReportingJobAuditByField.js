const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { ReportingJobAudit } = require("models");
const { Op } = require("sequelize");

const getIdListOfReportingJobAuditByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const options = {
      where: { isActive: true },
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true };
    }

    let reportingJobAuditIdList = await ReportingJobAudit.findAll(options);

    if (!reportingJobAuditIdList) {
      throw new NotFoundError(
        `ReportingJobAudit with the specified criteria not found`,
      );
    }

    reportingJobAuditIdList = reportingJobAuditIdList.map((item) => item.id);
    return reportingJobAuditIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReportingJobAuditIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfReportingJobAuditByField;
