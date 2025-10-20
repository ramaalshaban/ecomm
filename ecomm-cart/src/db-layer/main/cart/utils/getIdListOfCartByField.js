const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Cart } = require("models");
const { Op } = require("sequelize");

const getIdListOfCartByField = async (fieldName, fieldValue, isArray) => {
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

    let cartIdList = await Cart.findAll(options);

    if (!cartIdList) {
      throw new NotFoundError(`Cart with the specified criteria not found`);
    }

    cartIdList = cartIdList.map((item) => item.id);
    return cartIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingCartIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfCartByField;
