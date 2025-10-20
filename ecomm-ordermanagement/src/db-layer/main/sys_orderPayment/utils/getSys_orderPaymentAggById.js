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

const getSys_orderPaymentAggById = async (sys_orderPaymentId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const sys_orderPayment = Array.isArray(sys_orderPaymentId)
      ? await Sys_orderPayment.findAll({
          where: {
            id: { [Op.in]: sys_orderPaymentId },
            isActive: true,
          },
          include: includes,
        })
      : await Sys_orderPayment.findOne({
          where: {
            id: sys_orderPaymentId,
            isActive: true,
          },
          include: includes,
        });

    if (!sys_orderPayment) {
      return null;
    }

    const sys_orderPaymentData =
      Array.isArray(sys_orderPaymentId) && sys_orderPaymentId.length > 0
        ? sys_orderPayment.map((item) => item.getData())
        : sys_orderPayment.getData();
    await Sys_orderPayment.getCqrsJoins(sys_orderPaymentData);
    return sys_orderPaymentData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_orderPaymentAggById",
      err,
    );
  }
};

module.exports = getSys_orderPaymentAggById;
