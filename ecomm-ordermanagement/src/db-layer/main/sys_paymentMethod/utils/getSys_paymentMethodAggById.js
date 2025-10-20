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

const getSys_paymentMethodAggById = async (sys_paymentMethodId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const sys_paymentMethod = Array.isArray(sys_paymentMethodId)
      ? await Sys_paymentMethod.findAll({
          where: {
            id: { [Op.in]: sys_paymentMethodId },
            isActive: true,
          },
          include: includes,
        })
      : await Sys_paymentMethod.findOne({
          where: {
            id: sys_paymentMethodId,
            isActive: true,
          },
          include: includes,
        });

    if (!sys_paymentMethod) {
      return null;
    }

    const sys_paymentMethodData =
      Array.isArray(sys_paymentMethodId) && sys_paymentMethodId.length > 0
        ? sys_paymentMethod.map((item) => item.getData())
        : sys_paymentMethod.getData();
    await Sys_paymentMethod.getCqrsJoins(sys_paymentMethodData);
    return sys_paymentMethodData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentMethodAggById",
      err,
    );
  }
};

module.exports = getSys_paymentMethodAggById;
