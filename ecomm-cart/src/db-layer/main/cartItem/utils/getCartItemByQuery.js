const { HttpServerError, BadRequestError } = require("common");

const { CartItem } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getCartItemByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const cartItem = await CartItem.findOne({
      where: query,
    });

    if (!cartItem) return null;
    return cartItem.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingCartItemByQuery",
      err,
    );
  }
};

module.exports = getCartItemByQuery;
