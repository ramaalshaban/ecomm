const { HttpServerError, BadRequestError } = require("common");

const { SalesReport } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getSalesReportByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const salesReport = await SalesReport.findOne({
      where: query,
    });

    if (!salesReport) return null;
    return salesReport.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSalesReportByQuery",
      err,
    );
  }
};

module.exports = getSalesReportByQuery;
