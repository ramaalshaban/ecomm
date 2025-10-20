const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { hexaLogger } = require("common");
const { Sys_paymentMethod } = require("models");
const { Op } = require("sequelize");

const getSys_paymentMethodByUserId = async (userId) => {
  try {
    const sys_paymentMethod = await Sys_paymentMethod.findOne({
      where: {
        userId: userId,
        isActive: true,
      },
    });

    if (!sys_paymentMethod) {
      return null;
    }
    return sys_paymentMethod.getData();
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentMethodByUserId",
      err,
    );
  }
};

module.exports = getSys_paymentMethodByUserId;
