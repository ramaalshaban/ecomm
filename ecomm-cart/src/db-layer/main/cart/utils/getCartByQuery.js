const { HttpServerError, BadRequestError } = require("common");

const { Cart } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getCartByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const cart = await Cart.findOne({
      where: query,
    });

    if (!cart) return null;
    return cart.getData();
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenRequestingCartByQuery", err);
  }
};

module.exports = getCartByQuery;
