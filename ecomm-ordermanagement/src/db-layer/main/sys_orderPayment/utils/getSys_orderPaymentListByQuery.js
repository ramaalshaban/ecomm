const { HttpServerError, BadRequestError } = require("common");

const { Sys_orderPayment } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getSys_orderPaymentListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const sys_orderPayment = await Sys_orderPayment.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!sys_orderPayment || sys_orderPayment.length === 0) return [];

    //      if (!sys_orderPayment || sys_orderPayment.length === 0) {
    //      throw new NotFoundError(
    //      `Sys_orderPayment with the specified criteria not found`
    //  );
    //}

    return sys_orderPayment.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_orderPaymentListByQuery",
      err,
    );
  }
};

module.exports = getSys_orderPaymentListByQuery;
