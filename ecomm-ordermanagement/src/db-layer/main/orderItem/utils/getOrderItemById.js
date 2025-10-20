const { HttpServerError } = require("common");

let { OrderItem } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getOrderItemById = async (orderItemId) => {
  try {
    const orderItem = Array.isArray(orderItemId)
      ? await OrderItem.findAll({
          where: {
            id: { [Op.in]: orderItemId },
          },
        })
      : await OrderItem.findByPk(orderItemId);

    if (!orderItem) {
      return null;
    }
    return Array.isArray(orderItemId)
      ? orderItem.map((item) => item.getData())
      : orderItem.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingOrderItemById", err);
  }
};

module.exports = getOrderItemById;
