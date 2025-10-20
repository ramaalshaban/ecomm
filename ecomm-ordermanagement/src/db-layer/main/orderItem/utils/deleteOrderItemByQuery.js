const { HttpServerError, BadRequestError } = require("common");
const { OrderItem } = require("models");
const { Op } = require("sequelize");
// shoul i add softdelete condition?
const deleteOrderItemByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const rows = await OrderItem.findAll({ where: query });
    if (!rows || rows.length === 0) return [];

    await OrderItem.destroy({ where: query });
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenDeletingOrderItemByQuery",
      err,
    );
  }
};

module.exports = deleteOrderItemByQuery;
