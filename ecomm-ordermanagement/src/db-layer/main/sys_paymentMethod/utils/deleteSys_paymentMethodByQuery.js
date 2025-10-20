const { HttpServerError, BadRequestError } = require("common");
const { Sys_paymentMethod } = require("models");
const { Op } = require("sequelize");
// shoul i add softdelete condition?
const deleteSys_paymentMethodByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    let rowsCount = null;
    let rows = null;
    const options = { where: { ...query, isActive: true }, returning: true };
    [rowsCount, rows] = await Sys_paymentMethod.update(
      { isActive: false },
      options,
    );
    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenDeletingSys_paymentMethodByQuery",
      err,
    );
  }
};

module.exports = deleteSys_paymentMethodByQuery;
