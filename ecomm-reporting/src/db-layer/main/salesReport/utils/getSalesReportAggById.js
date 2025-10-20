const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { SalesReport, ExportJob, ReportingJobAudit } = require("models");
const { Op } = require("sequelize");

const getSalesReportAggById = async (salesReportId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const salesReport = Array.isArray(salesReportId)
      ? await SalesReport.findAll({
          where: {
            id: { [Op.in]: salesReportId },
          },
          include: includes,
        })
      : await SalesReport.findByPk(salesReportId, { include: includes });

    if (!salesReport) {
      return null;
    }

    const salesReportData =
      Array.isArray(salesReportId) && salesReportId.length > 0
        ? salesReport.map((item) => item.getData())
        : salesReport.getData();
    await SalesReport.getCqrsJoins(salesReportData);
    return salesReportData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSalesReportAggById",
      err,
    );
  }
};

module.exports = getSalesReportAggById;
