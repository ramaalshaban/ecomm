const { HttpServerError, BadRequestError } = require("common");

const { Bvf } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getBvfListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const bvf = await Bvf.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!bvf || bvf.length === 0) return [];

    //      if (!bvf || bvf.length === 0) {
    //      throw new NotFoundError(
    //      `Bvf with the specified criteria not found`
    //  );
    //}

    return bvf.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingBvfListByQuery",
      err,
    );
  }
};

module.exports = getBvfListByQuery;
