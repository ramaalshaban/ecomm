const { HttpServerError, BadRequestError } = require("common");

const { Order } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getOrderListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const order = await Order.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!order || order.length === 0) return [];

    //      if (!order || order.length === 0) {
    //      throw new NotFoundError(
    //      `Order with the specified criteria not found`
    //  );
    //}

    return order.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingOrderListByQuery",
      err,
    );
  }
};

module.exports = getOrderListByQuery;
