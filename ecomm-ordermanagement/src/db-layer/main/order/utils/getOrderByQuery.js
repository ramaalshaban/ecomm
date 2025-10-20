const { HttpServerError, BadRequestError } = require("common");

const { Order } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getOrderByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const order = await Order.findOne({
      where: query,
    });

    if (!order) return null;
    return order.getData();
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenRequestingOrderByQuery", err);
  }
};

module.exports = getOrderByQuery;
