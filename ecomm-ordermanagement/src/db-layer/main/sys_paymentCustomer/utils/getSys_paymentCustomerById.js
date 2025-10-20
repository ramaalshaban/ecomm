const { HttpServerError } = require("common");

let { Sys_paymentCustomer } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getSys_paymentCustomerById = async (sys_paymentCustomerId) => {
  try {
    const sys_paymentCustomer = Array.isArray(sys_paymentCustomerId)
      ? await Sys_paymentCustomer.findAll({
          where: {
            id: { [Op.in]: sys_paymentCustomerId },
            isActive: true,
          },
        })
      : await Sys_paymentCustomer.findOne({
          where: {
            id: sys_paymentCustomerId,
            isActive: true,
          },
        });

    if (!sys_paymentCustomer) {
      return null;
    }
    return Array.isArray(sys_paymentCustomerId)
      ? sys_paymentCustomer.map((item) => item.getData())
      : sys_paymentCustomer.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentCustomerById",
      err,
    );
  }
};

module.exports = getSys_paymentCustomerById;
