const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Cart, CartItem, Ko, Bvf } = require("models");
const { Op } = require("sequelize");

const getCartItemAggById = async (cartItemId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const cartItem = Array.isArray(cartItemId)
      ? await CartItem.findAll({
          where: {
            id: { [Op.in]: cartItemId },
          },
          include: includes,
        })
      : await CartItem.findByPk(cartItemId, { include: includes });

    if (!cartItem) {
      return null;
    }

    const cartItemData =
      Array.isArray(cartItemId) && cartItemId.length > 0
        ? cartItem.map((item) => item.getData())
        : cartItem.getData();
    await CartItem.getCqrsJoins(cartItemData);
    return cartItemData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingCartItemAggById",
      err,
    );
  }
};

module.exports = getCartItemAggById;
