const { HttpServerError, BadRequestError } = require("common");
const { SalesReport } = require("models");
const { Op } = require("sequelize");
// shoul i add softdelete condition?
const deleteSalesReportByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const rows = await SalesReport.findAll({ where: query });
    if (!rows || rows.length === 0) return [];

    await SalesReport.destroy({ where: query });
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenDeletingSalesReportByQuery",
      err,
    );
  }
};

module.exports = deleteSalesReportByQuery;
