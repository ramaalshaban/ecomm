const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const {
  Order,
  OrderItem,
  Sys_orderPayment,
  Sys_paymentCustomer,
  Sys_paymentMethod,
} = require("models");
const { Op } = require("sequelize");

const getSys_paymentCustomerAggById = async (sys_paymentCustomerId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const sys_paymentCustomer = Array.isArray(sys_paymentCustomerId)
      ? await Sys_paymentCustomer.findAll({
          where: {
            id: { [Op.in]: sys_paymentCustomerId },
            isActive: true,
          },
          include: includes,
        })
      : await Sys_paymentCustomer.findOne({
          where: {
            id: sys_paymentCustomerId,
            isActive: true,
          },
          include: includes,
        });

    if (!sys_paymentCustomer) {
      return null;
    }

    const sys_paymentCustomerData =
      Array.isArray(sys_paymentCustomerId) && sys_paymentCustomerId.length > 0
        ? sys_paymentCustomer.map((item) => item.getData())
        : sys_paymentCustomer.getData();
    await Sys_paymentCustomer.getCqrsJoins(sys_paymentCustomerData);
    return sys_paymentCustomerData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentCustomerAggById",
      err,
    );
  }
};

module.exports = getSys_paymentCustomerAggById;
