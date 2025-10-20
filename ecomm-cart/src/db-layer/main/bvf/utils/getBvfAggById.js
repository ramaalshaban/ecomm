const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Cart, CartItem, Ko, Bvf } = require("models");
const { Op } = require("sequelize");

const getBvfAggById = async (bvfId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const bvf = Array.isArray(bvfId)
      ? await Bvf.findAll({
          where: {
            id: { [Op.in]: bvfId },
            isActive: true,
          },
          include: includes,
        })
      : await Bvf.findOne({
          where: {
            id: bvfId,
            isActive: true,
          },
          include: includes,
        });

    if (!bvf) {
      return null;
    }

    const bvfData =
      Array.isArray(bvfId) && bvfId.length > 0
        ? bvf.map((item) => item.getData())
        : bvf.getData();
    await Bvf.getCqrsJoins(bvfData);
    return bvfData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingBvfAggById", err);
  }
};

module.exports = getBvfAggById;
