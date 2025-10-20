const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Order } = require("models");
const { Op } = require("sequelize");

const getIdListOfOrderByField = async (fieldName, fieldValue, isArray) => {
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

    let orderIdList = await Order.findAll(options);

    if (!orderIdList) {
      throw new NotFoundError(`Order with the specified criteria not found`);
    }

    orderIdList = orderIdList.map((item) => item.id);
    return orderIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingOrderIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfOrderByField;
