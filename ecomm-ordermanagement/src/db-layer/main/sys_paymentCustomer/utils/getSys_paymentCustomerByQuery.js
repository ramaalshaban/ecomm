const { HttpServerError, BadRequestError } = require("common");

const { Sys_paymentCustomer } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getSys_paymentCustomerByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const sys_paymentCustomer = await Sys_paymentCustomer.findOne({
      where: query,
    });

    if (!sys_paymentCustomer) return null;
    return sys_paymentCustomer.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentCustomerByQuery",
      err,
    );
  }
};

module.exports = getSys_paymentCustomerByQuery;
