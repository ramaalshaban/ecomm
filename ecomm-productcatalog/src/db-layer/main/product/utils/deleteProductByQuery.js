const { HttpServerError, BadRequestError } = require("common");
const { Product } = require("models");
const { Op } = require("sequelize");
// shoul i add softdelete condition?
const deleteProductByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const rows = await Product.findAll({ where: query });
    if (!rows || rows.length === 0) return [];

    await Product.destroy({ where: query });
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenDeletingProductByQuery", err);
  }
};

module.exports = deleteProductByQuery;
