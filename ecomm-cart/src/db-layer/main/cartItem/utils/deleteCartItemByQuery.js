const { HttpServerError, BadRequestError } = require("common");
const { CartItem } = require("models");
const { Op } = require("sequelize");
// shoul i add softdelete condition?
const deleteCartItemByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const rows = await CartItem.findAll({ where: query });
    if (!rows || rows.length === 0) return [];

    await CartItem.destroy({ where: query });
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenDeletingCartItemByQuery", err);
  }
};

module.exports = deleteCartItemByQuery;
