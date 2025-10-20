const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Sys_paymentCustomer } = require("models");
const { Op } = require("sequelize");

const getIdListOfSys_paymentCustomerByField = async (
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

    let sys_paymentCustomerIdList = await Sys_paymentCustomer.findAll(options);

    if (!sys_paymentCustomerIdList) {
      throw new NotFoundError(
        `Sys_paymentCustomer with the specified criteria not found`,
      );
    }

    sys_paymentCustomerIdList = sys_paymentCustomerIdList.map(
      (item) => item.id,
    );
    return sys_paymentCustomerIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSys_paymentCustomerIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfSys_paymentCustomerByField;
