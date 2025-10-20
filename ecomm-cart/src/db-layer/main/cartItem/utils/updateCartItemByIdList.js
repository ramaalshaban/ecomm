const { HttpServerError } = require("common");

const { CartItem } = require("models");
const { Op } = require("sequelize");

const updateCartItemByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = { where: { id: { [Op.in]: idList } }, returning: true };

    [rowsCount, rows] = await CartItem.update(dataClause, options);
    const cartItemIdList = rows.map((item) => item.id);
    return cartItemIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingCartItemByIdList",
      err,
    );
  }
};

module.exports = updateCartItemByIdList;
