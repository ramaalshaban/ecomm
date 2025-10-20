const { HttpServerError, BadRequestError } = require("common");

const { Sys_orderPayment } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getSys_orderPaymentByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const sys_orderPayment = await Sys_orderPayment.findOne({
      where: query,
    });

    if (!sys_orderPayment) return null;
    return sys_orderPayment.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_orderPaymentByQuery",
      err,
    );
  }
};

module.exports = getSys_orderPaymentByQuery;
