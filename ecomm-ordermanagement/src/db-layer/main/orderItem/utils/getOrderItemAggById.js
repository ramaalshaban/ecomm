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

const getOrderItemAggById = async (orderItemId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const orderItem = Array.isArray(orderItemId)
      ? await OrderItem.findAll({
          where: {
            id: { [Op.in]: orderItemId },
          },
          include: includes,
        })
      : await OrderItem.findByPk(orderItemId, { include: includes });

    if (!orderItem) {
      return null;
    }

    const orderItemData =
      Array.isArray(orderItemId) && orderItemId.length > 0
        ? orderItem.map((item) => item.getData())
        : orderItem.getData();
    await OrderItem.getCqrsJoins(orderItemData);
    return orderItemData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingOrderItemAggById",
      err,
    );
  }
};

module.exports = getOrderItemAggById;
