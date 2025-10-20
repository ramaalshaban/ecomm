const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Sys_orderPayment } = require("models");
const { Op } = require("sequelize");

const getIdListOfSys_orderPaymentByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const options = {
      where: { isActive: true },
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true };
    }

    let sys_orderPaymentIdList = await Sys_orderPayment.findAll(options);

    if (!sys_orderPaymentIdList) {
      throw new NotFoundError(
        `Sys_orderPayment with the specified criteria not found`,
      );
    }

    sys_orderPaymentIdList = sys_orderPaymentIdList.map((item) => item.id);
    return sys_orderPaymentIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_orderPaymentIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfSys_orderPaymentByField;
