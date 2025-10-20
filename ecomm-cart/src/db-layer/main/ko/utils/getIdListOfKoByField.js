const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Ko } = require("models");
const { Op } = require("sequelize");

const getIdListOfKoByField = async (fieldName, fieldValue, isArray) => {
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

    let koIdList = await Ko.findAll(options);

    if (!koIdList) {
      throw new NotFoundError(`Ko with the specified criteria not found`);
    }

    koIdList = koIdList.map((item) => item.id);
    return koIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingKoIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfKoByField;
