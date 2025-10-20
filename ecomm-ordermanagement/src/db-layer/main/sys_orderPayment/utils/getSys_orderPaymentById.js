const { HttpServerError } = require("common");

let { Sys_orderPayment } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getSys_orderPaymentById = async (sys_orderPaymentId) => {
  try {
    const sys_orderPayment = Array.isArray(sys_orderPaymentId)
      ? await Sys_orderPayment.findAll({
          where: {
            id: { [Op.in]: sys_orderPaymentId },
            isActive: true,
          },
        })
      : await Sys_orderPayment.findOne({
          where: {
            id: sys_orderPaymentId,
            isActive: true,
          },
        });

    if (!sys_orderPayment) {
      return null;
    }
    return Array.isArray(sys_orderPaymentId)
      ? sys_orderPayment.map((item) => item.getData())
      : sys_orderPayment.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_orderPaymentById",
      err,
    );
  }
};

module.exports = getSys_orderPaymentById;
