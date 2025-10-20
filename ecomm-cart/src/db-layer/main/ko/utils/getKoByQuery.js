const { HttpServerError, BadRequestError } = require("common");

const { Ko } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getKoByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const ko = await Ko.findOne({
      where: query,
    });

    if (!ko) return null;
    return ko.getData();
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenRequestingKoByQuery", err);
  }
};

module.exports = getKoByQuery;
