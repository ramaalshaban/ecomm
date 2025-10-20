const { HttpServerError, BadRequestError } = require("common");

const { SalesReport } = require("models");
const { Op } = require("sequelize");

const updateSalesReportByQuery = async (dataClause, query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    let rowsCount = null;
    let rows = null;

    const options = { where: query, returning: true };

    [rowsCount, rows] = await SalesReport.update(dataClause, options);

    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingSalesReportByQuery",
      err,
    );
  }
};

module.exports = updateSalesReportByQuery;
