const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Cart, CartItem, Ko, Bvf } = require("models");
const { Op } = require("sequelize");

const getCartAggById = async (cartId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const cart = Array.isArray(cartId)
      ? await Cart.findAll({
          where: {
            id: { [Op.in]: cartId },
            isActive: true,
          },
          include: includes,
        })
      : await Cart.findOne({
          where: {
            id: cartId,
            isActive: true,
          },
          include: includes,
        });

    if (!cart) {
      return null;
    }

    const cartData =
      Array.isArray(cartId) && cartId.length > 0
        ? cart.map((item) => item.getData())
        : cart.getData();
    await Cart.getCqrsJoins(cartData);
    return cartData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingCartAggById", err);
  }
};

module.exports = getCartAggById;
