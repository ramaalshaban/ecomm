const { HttpServerError } = require("common");

let { SalesReport } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getSalesReportById = async (salesReportId) => {
  try {
    const salesReport = Array.isArray(salesReportId)
      ? await SalesReport.findAll({
          where: {
            id: { [Op.in]: salesReportId },
          },
        })
      : await SalesReport.findByPk(salesReportId);

    if (!salesReport) {
      return null;
    }
    return Array.isArray(salesReportId)
      ? salesReport.map((item) => item.getData())
      : salesReport.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSalesReportById",
      err,
    );
  }
};

module.exports = getSalesReportById;
