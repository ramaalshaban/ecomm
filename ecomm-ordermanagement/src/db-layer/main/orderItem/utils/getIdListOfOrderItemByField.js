const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { OrderItem } = require("models");
const { Op } = require("sequelize");

const getIdListOfOrderItemByField = async (fieldName, fieldValue, isArray) => {
  try {
    const options = {
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] } }
        : { [fieldName]: fieldValue };
    }

    let orderItemIdList = await OrderItem.findAll(options);

    if (!orderItemIdList) {
      throw new NotFoundError(
        `OrderItem with the specified criteria not found`,
      );
    }

    orderItemIdList = orderItemIdList.map((item) => item.id);
    return orderItemIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingOrderItemIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfOrderItemByField;
