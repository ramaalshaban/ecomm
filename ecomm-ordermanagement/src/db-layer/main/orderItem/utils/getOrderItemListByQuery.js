const { HttpServerError, BadRequestError } = require("common");

const { OrderItem } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getOrderItemListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const orderItem = await OrderItem.findAll({
      where: query,
    });

    //should i add not found error or only return empty array?
    if (!orderItem || orderItem.length === 0) return [];

    //      if (!orderItem || orderItem.length === 0) {
    //      throw new NotFoundError(
    //      `OrderItem with the specified criteria not found`
    //  );
    //}

    return orderItem.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingOrderItemListByQuery",
      err,
    );
  }
};

module.exports = getOrderItemListByQuery;
