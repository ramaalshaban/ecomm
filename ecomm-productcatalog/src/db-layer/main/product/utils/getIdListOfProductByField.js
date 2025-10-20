const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Product } = require("models");
const { Op } = require("sequelize");

const getIdListOfProductByField = async (fieldName, fieldValue, isArray) => {
  try {
    const options = {
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] } }
        : { [fieldName]: fieldValue };
    }

    let productIdList = await Product.findAll(options);

    if (!productIdList) {
      throw new NotFoundError(`Product with the specified criteria not found`);
    }

    productIdList = productIdList.map((item) => item.id);
    return productIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingProductIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfProductByField;
