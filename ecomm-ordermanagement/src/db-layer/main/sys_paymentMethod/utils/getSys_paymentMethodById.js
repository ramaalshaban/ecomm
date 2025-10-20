const { HttpServerError } = require("common");

let { Sys_paymentMethod } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getSys_paymentMethodById = async (sys_paymentMethodId) => {
  try {
    const sys_paymentMethod = Array.isArray(sys_paymentMethodId)
      ? await Sys_paymentMethod.findAll({
          where: {
            id: { [Op.in]: sys_paymentMethodId },
            isActive: true,
          },
        })
      : await Sys_paymentMethod.findOne({
          where: {
            id: sys_paymentMethodId,
            isActive: true,
          },
        });

    if (!sys_paymentMethod) {
      return null;
    }
    return Array.isArray(sys_paymentMethodId)
      ? sys_paymentMethod.map((item) => item.getData())
      : sys_paymentMethod.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentMethodById",
      err,
    );
  }
};

module.exports = getSys_paymentMethodById;
