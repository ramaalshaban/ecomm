const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Cart, CartItem, Ko, Bvf } = require("models");
const { Op } = require("sequelize");

const getKoAggById = async (koId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const ko = Array.isArray(koId)
      ? await Ko.findAll({
          where: {
            id: { [Op.in]: koId },
            isActive: true,
          },
          include: includes,
        })
      : await Ko.findOne({
          where: {
            id: koId,
            isActive: true,
          },
          include: includes,
        });

    if (!ko) {
      return null;
    }

    const koData =
      Array.isArray(koId) && koId.length > 0
        ? ko.map((item) => item.getData())
        : ko.getData();
    await Ko.getCqrsJoins(koData);
    return koData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingKoAggById", err);
  }
};

module.exports = getKoAggById;
