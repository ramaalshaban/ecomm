const { HttpServerError } = require("common");

const { Sys_orderPayment } = require("models");
const { Op } = require("sequelize");

const updateSys_orderPaymentByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Sys_orderPayment.update(dataClause, options);
    const sys_orderPaymentIdList = rows.map((item) => item.id);
    return sys_orderPaymentIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingSys_orderPaymentByIdList",
      err,
    );
  }
};

module.exports = updateSys_orderPaymentByIdList;
