const { HttpServerError } = require("common");

let { Ko } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getKoById = async (koId) => {
  try {
    const ko = Array.isArray(koId)
      ? await Ko.findAll({
          where: {
            id: { [Op.in]: koId },
            isActive: true,
          },
        })
      : await Ko.findOne({
          where: {
            id: koId,
            isActive: true,
          },
        });

    if (!ko) {
      return null;
    }
    return Array.isArray(koId)
      ? ko.map((item) => item.getData())
      : ko.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingKoById", err);
  }
};

module.exports = getKoById;
