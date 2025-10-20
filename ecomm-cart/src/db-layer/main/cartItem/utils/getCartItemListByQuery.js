const { HttpServerError, BadRequestError } = require("common");

const { CartItem } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getCartItemListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const cartItem = await CartItem.findAll({
      where: query,
    });

    //should i add not found error or only return empty array?
    if (!cartItem || cartItem.length === 0) return [];

    //      if (!cartItem || cartItem.length === 0) {
    //      throw new NotFoundError(
    //      `CartItem with the specified criteria not found`
    //  );
    //}

    return cartItem.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingCartItemListByQuery",
      err,
    );
  }
};

module.exports = getCartItemListByQuery;
