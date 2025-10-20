const { HttpServerError, BadRequestError } = require("common");

const { Cart } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getCartListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const cart = await Cart.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!cart || cart.length === 0) return [];

    //      if (!cart || cart.length === 0) {
    //      throw new NotFoundError(
    //      `Cart with the specified criteria not found`
    //  );
    //}

    return cart.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingCartListByQuery",
      err,
    );
  }
};

module.exports = getCartListByQuery;
