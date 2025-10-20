const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { hexaLogger } = require("common");
const { Sys_paymentCustomer } = require("models");
const { Op } = require("sequelize");

const getSys_paymentCustomerByUserId = async (userId) => {
  try {
    const sys_paymentCustomer = await Sys_paymentCustomer.findOne({
      where: {
        userId: userId,
        isActive: true,
      },
    });

    if (!sys_paymentCustomer) {
      return null;
    }
    return sys_paymentCustomer.getData();
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentCustomerByUserId",
      err,
    );
  }
};

module.exports = getSys_paymentCustomerByUserId;
