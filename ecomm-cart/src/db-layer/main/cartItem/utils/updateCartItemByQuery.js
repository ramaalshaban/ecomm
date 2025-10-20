const { HttpServerError, BadRequestError } = require("common");

const { CartItem } = require("models");
const { Op } = require("sequelize");

const updateCartItemByQuery = async (dataClause, query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    let rowsCount = null;
    let rows = null;

    const options = { where: query, returning: true };

    [rowsCount, rows] = await CartItem.update(dataClause, options);

    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingCartItemByQuery", err);
  }
};

module.exports = updateCartItemByQuery;
