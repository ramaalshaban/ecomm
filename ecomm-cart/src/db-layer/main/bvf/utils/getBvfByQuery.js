const { HttpServerError, BadRequestError } = require("common");

const { Bvf } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getBvfByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const bvf = await Bvf.findOne({
      where: query,
    });

    if (!bvf) return null;
    return bvf.getData();
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenRequestingBvfByQuery", err);
  }
};

module.exports = getBvfByQuery;
