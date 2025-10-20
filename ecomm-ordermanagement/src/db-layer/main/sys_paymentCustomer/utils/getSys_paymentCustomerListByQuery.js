const { HttpServerError, BadRequestError } = require("common");

const { Sys_paymentCustomer } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getSys_paymentCustomerListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const sys_paymentCustomer = await Sys_paymentCustomer.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!sys_paymentCustomer || sys_paymentCustomer.length === 0) return [];

    //      if (!sys_paymentCustomer || sys_paymentCustomer.length === 0) {
    //      throw new NotFoundError(
    //      `Sys_paymentCustomer with the specified criteria not found`
    //  );
    //}

    return sys_paymentCustomer.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentCustomerListByQuery",
      err,
    );
  }
};

module.exports = getSys_paymentCustomerListByQuery;
