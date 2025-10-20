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

const getSys_paymentCustomerByCustomerId = async (customerId) => {
  try {
    const sys_paymentCustomer = await Sys_paymentCustomer.findOne({
      where: {
        customerId: customerId,
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
      "errMsg_dbErrorWhenRequestingSys_paymentCustomerByCustomerId",
      err,
    );
  }
};

module.exports = getSys_paymentCustomerByCustomerId;
