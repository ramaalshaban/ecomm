const { HttpServerError } = require("common");

const { Order } = require("models");
const { Op } = require("sequelize");

const updateOrderByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Order.update(dataClause, options);
    const orderIdList = rows.map((item) => item.id);
    return orderIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingOrderByIdList", err);
  }
};

module.exports = updateOrderByIdList;
