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

const getOrderAggById = async (orderId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const order = Array.isArray(orderId)
      ? await Order.findAll({
          where: {
            id: { [Op.in]: orderId },
            isActive: true,
          },
          include: includes,
        })
      : await Order.findOne({
          where: {
            id: orderId,
            isActive: true,
          },
          include: includes,
        });

    if (!order) {
      return null;
    }

    const orderData =
      Array.isArray(orderId) && orderId.length > 0
        ? order.map((item) => item.getData())
        : order.getData();
    await Order.getCqrsJoins(orderData);
    return orderData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingOrderAggById", err);
  }
};

module.exports = getOrderAggById;
