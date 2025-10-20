const { HttpServerError, BadRequestError } = require("common");

const { Sys_orderPayment } = require("models");
const { Op } = require("sequelize");

const updateSys_orderPaymentByQuery = async (dataClause, query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    let rowsCount = null;
    let rows = null;

    const options = { where: { query, isActive: true }, returning: true };

    [rowsCount, rows] = await Sys_orderPayment.update(dataClause, options);

    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingSys_orderPaymentByQuery",
      err,
    );
  }
};

module.exports = updateSys_orderPaymentByQuery;
