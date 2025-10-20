const { HttpServerError } = require("common");

let { CartItem } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getCartItemById = async (cartItemId) => {
  try {
    const cartItem = Array.isArray(cartItemId)
      ? await CartItem.findAll({
          where: {
            id: { [Op.in]: cartItemId },
          },
        })
      : await CartItem.findByPk(cartItemId);

    if (!cartItem) {
      return null;
    }
    return Array.isArray(cartItemId)
      ? cartItem.map((item) => item.getData())
      : cartItem.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingCartItemById", err);
  }
};

module.exports = getCartItemById;
