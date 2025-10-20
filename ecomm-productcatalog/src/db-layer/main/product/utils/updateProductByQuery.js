const { HttpServerError, BadRequestError } = require("common");

const { Product } = require("models");
const { Op } = require("sequelize");

const updateProductByQuery = async (dataClause, query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    let rowsCount = null;
    let rows = null;

    const options = { where: query, returning: true };

    [rowsCount, rows] = await Product.update(dataClause, options);

    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingProductByQuery", err);
  }
};

module.exports = updateProductByQuery;
