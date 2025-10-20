const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { SalesReport, ExportJob, ReportingJobAudit } = require("models");
const { Op } = require("sequelize");

const getExportJobAggById = async (exportJobId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const exportJob = Array.isArray(exportJobId)
      ? await ExportJob.findAll({
          where: {
            id: { [Op.in]: exportJobId },
            isActive: true,
          },
          include: includes,
        })
      : await ExportJob.findOne({
          where: {
            id: exportJobId,
            isActive: true,
          },
          include: includes,
        });

    if (!exportJob) {
      return null;
    }

    const exportJobData =
      Array.isArray(exportJobId) && exportJobId.length > 0
        ? exportJob.map((item) => item.getData())
        : exportJob.getData();
    await ExportJob.getCqrsJoins(exportJobData);
    return exportJobData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingExportJobAggById",
      err,
    );
  }
};

module.exports = getExportJobAggById;
