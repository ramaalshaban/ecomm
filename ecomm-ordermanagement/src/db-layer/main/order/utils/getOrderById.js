const { HttpServerError } = require("common");

let { Order } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getOrderById = async (orderId) => {
  try {
    const order = Array.isArray(orderId)
      ? await Order.findAll({
          where: {
            id: { [Op.in]: orderId },
            isActive: true,
          },
        })
      : await Order.findOne({
          where: {
            id: orderId,
            isActive: true,
          },
        });

    if (!order) {
      return null;
    }
    return Array.isArray(orderId)
      ? order.map((item) => item.getData())
      : order.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingOrderById", err);
  }
};

module.exports = getOrderById;
