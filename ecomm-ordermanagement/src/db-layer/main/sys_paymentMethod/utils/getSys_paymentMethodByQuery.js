const { HttpServerError, BadRequestError } = require("common");

const { Sys_paymentMethod } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getSys_paymentMethodByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const sys_paymentMethod = await Sys_paymentMethod.findOne({
      where: query,
    });

    if (!sys_paymentMethod) return null;
    return sys_paymentMethod.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentMethodByQuery",
      err,
    );
  }
};

module.exports = getSys_paymentMethodByQuery;
