const { HttpServerError } = require("common");

const { Sys_paymentCustomer } = require("models");
const { Op } = require("sequelize");

const updateSys_paymentCustomerByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Sys_paymentCustomer.update(dataClause, options);
    const sys_paymentCustomerIdList = rows.map((item) => item.id);
    return sys_paymentCustomerIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingSys_paymentCustomerByIdList",
      err,
    );
  }
};

module.exports = updateSys_paymentCustomerByIdList;
