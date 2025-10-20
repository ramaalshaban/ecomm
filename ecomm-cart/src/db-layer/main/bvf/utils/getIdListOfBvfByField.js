const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Bvf } = require("models");
const { Op } = require("sequelize");

const getIdListOfBvfByField = async (fieldName, fieldValue, isArray) => {
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

    let bvfIdList = await Bvf.findAll(options);

    if (!bvfIdList) {
      throw new NotFoundError(`Bvf with the specified criteria not found`);
    }

    bvfIdList = bvfIdList.map((item) => item.id);
    return bvfIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingBvfIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfBvfByField;
