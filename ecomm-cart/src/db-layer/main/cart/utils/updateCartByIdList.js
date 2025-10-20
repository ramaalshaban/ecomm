const { HttpServerError } = require("common");

const { Cart } = require("models");
const { Op } = require("sequelize");

const updateCartByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Cart.update(dataClause, options);
    const cartIdList = rows.map((item) => item.id);
    return cartIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingCartByIdList", err);
  }
};

module.exports = updateCartByIdList;
