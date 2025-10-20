const { HttpServerError } = require("common");

let { Cart } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getCartById = async (cartId) => {
  try {
    const cart = Array.isArray(cartId)
      ? await Cart.findAll({
          where: {
            id: { [Op.in]: cartId },
            isActive: true,
          },
        })
      : await Cart.findOne({
          where: {
            id: cartId,
            isActive: true,
          },
        });

    if (!cart) {
      return null;
    }
    return Array.isArray(cartId)
      ? cart.map((item) => item.getData())
      : cart.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingCartById", err);
  }
};

module.exports = getCartById;
