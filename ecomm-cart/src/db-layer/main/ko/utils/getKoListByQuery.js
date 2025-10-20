const { HttpServerError, BadRequestError } = require("common");

const { Ko } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getKoListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const ko = await Ko.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!ko || ko.length === 0) return [];

    //      if (!ko || ko.length === 0) {
    //      throw new NotFoundError(
    //      `Ko with the specified criteria not found`
    //  );
    //}

    return ko.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingKoListByQuery", err);
  }
};

module.exports = getKoListByQuery;
