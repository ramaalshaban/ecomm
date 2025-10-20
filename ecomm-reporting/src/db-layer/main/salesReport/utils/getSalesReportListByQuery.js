const { HttpServerError, BadRequestError } = require("common");

const { SalesReport } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getSalesReportListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const salesReport = await SalesReport.findAll({
      where: query,
    });

    //should i add not found error or only return empty array?
    if (!salesReport || salesReport.length === 0) return [];

    //      if (!salesReport || salesReport.length === 0) {
    //      throw new NotFoundError(
    //      `SalesReport with the specified criteria not found`
    //  );
    //}

    return salesReport.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSalesReportListByQuery",
      err,
    );
  }
};

module.exports = getSalesReportListByQuery;
