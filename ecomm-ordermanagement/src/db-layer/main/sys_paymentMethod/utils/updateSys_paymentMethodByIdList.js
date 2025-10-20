const { HttpServerError } = require("common");

const { Sys_paymentMethod } = require("models");
const { Op } = require("sequelize");

const updateSys_paymentMethodByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Sys_paymentMethod.update(dataClause, options);
    const sys_paymentMethodIdList = rows.map((item) => item.id);
    return sys_paymentMethodIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingSys_paymentMethodByIdList",
      err,
    );
  }
};

module.exports = updateSys_paymentMethodByIdList;
