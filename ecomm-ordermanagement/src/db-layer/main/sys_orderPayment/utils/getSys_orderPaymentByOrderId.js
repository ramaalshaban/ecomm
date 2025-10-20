const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { hexaLogger } = require("common");
const { Sys_orderPayment } = require("models");
const { Op } = require("sequelize");

const getSys_orderPaymentByOrderId = async (orderId) => {
  try {
    const sys_orderPayment = await Sys_orderPayment.findOne({
      where: {
        orderId: orderId,
        isActive: true,
      },
    });

    if (!sys_orderPayment) {
      return null;
    }
    return sys_orderPayment.getData();
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_orderPaymentByOrderId",
      err,
    );
  }
};

module.exports = getSys_orderPaymentByOrderId;
