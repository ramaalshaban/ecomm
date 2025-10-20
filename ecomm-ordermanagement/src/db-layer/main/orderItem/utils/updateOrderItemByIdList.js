const { HttpServerError } = require("common");

const { OrderItem } = require("models");
const { Op } = require("sequelize");

const updateOrderItemByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = { where: { id: { [Op.in]: idList } }, returning: true };

    [rowsCount, rows] = await OrderItem.update(dataClause, options);
    const orderItemIdList = rows.map((item) => item.id);
    return orderItemIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingOrderItemByIdList",
      err,
    );
  }
};

module.exports = updateOrderItemByIdList;
