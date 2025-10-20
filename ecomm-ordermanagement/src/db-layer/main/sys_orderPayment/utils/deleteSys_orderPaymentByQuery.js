const { HttpServerError, BadRequestError } = require("common");
const { Sys_orderPayment } = require("models");
const { Op } = require("sequelize");
// shoul i add softdelete condition?
const deleteSys_orderPaymentByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    let rowsCount = null;
    let rows = null;
    const options = { where: { ...query, isActive: true }, returning: true };
    [rowsCount, rows] = await Sys_orderPayment.update(
      { isActive: false },
      options,
    );
    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenDeletingSys_orderPaymentByQuery",
      err,
    );
  }
};

module.exports = deleteSys_orderPaymentByQuery;
