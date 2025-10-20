const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Sys_paymentMethod } = require("models");
const { Op } = require("sequelize");

const getIdListOfSys_paymentMethodByField = async (
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

    let sys_paymentMethodIdList = await Sys_paymentMethod.findAll(options);

    if (!sys_paymentMethodIdList) {
      throw new NotFoundError(
        `Sys_paymentMethod with the specified criteria not found`,
      );
    }

    sys_paymentMethodIdList = sys_paymentMethodIdList.map((item) => item.id);
    return sys_paymentMethodIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentMethodIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfSys_paymentMethodByField;
