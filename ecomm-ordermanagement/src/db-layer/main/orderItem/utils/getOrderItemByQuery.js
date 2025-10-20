const { HttpServerError, BadRequestError } = require("common");

const { OrderItem } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getOrderItemByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const orderItem = await OrderItem.findOne({
      where: query,
    });

    if (!orderItem) return null;
    return orderItem.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingOrderItemByQuery",
      err,
    );
  }
};

module.exports = getOrderItemByQuery;
