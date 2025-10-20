const { HttpServerError } = require("common");

let { Bvf } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getBvfById = async (bvfId) => {
  try {
    const bvf = Array.isArray(bvfId)
      ? await Bvf.findAll({
          where: {
            id: { [Op.in]: bvfId },
            isActive: true,
          },
        })
      : await Bvf.findOne({
          where: {
            id: bvfId,
            isActive: true,
          },
        });

    if (!bvf) {
      return null;
    }
    return Array.isArray(bvfId)
      ? bvf.map((item) => item.getData())
      : bvf.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingBvfById", err);
  }
};

module.exports = getBvfById;
