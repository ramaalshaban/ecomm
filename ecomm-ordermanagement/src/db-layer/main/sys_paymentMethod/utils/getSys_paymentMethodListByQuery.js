const { HttpServerError, BadRequestError } = require("common");

const { Sys_paymentMethod } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getSys_paymentMethodListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const sys_paymentMethod = await Sys_paymentMethod.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!sys_paymentMethod || sys_paymentMethod.length === 0) return [];

    //      if (!sys_paymentMethod || sys_paymentMethod.length === 0) {
    //      throw new NotFoundError(
    //      `Sys_paymentMethod with the specified criteria not found`
    //  );
    //}

    return sys_paymentMethod.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentMethodListByQuery",
      err,
    );
  }
};

module.exports = getSys_paymentMethodListByQuery;
