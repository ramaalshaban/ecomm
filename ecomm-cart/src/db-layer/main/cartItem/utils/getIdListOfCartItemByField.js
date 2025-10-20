const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { CartItem } = require("models");
const { Op } = require("sequelize");

const getIdListOfCartItemByField = async (fieldName, fieldValue, isArray) => {
  try {
    const options = {
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] } }
        : { [fieldName]: fieldValue };
    }

    let cartItemIdList = await CartItem.findAll(options);

    if (!cartItemIdList) {
      throw new NotFoundError(`CartItem with the specified criteria not found`);
    }

    cartItemIdList = cartItemIdList.map((item) => item.id);
    return cartItemIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingCartItemIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfCartItemByField;
