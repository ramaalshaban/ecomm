const { HttpServerError, BadRequestError } = require("common");

const { ExportJob } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getExportJobListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const exportJob = await ExportJob.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!exportJob || exportJob.length === 0) return [];

    //      if (!exportJob || exportJob.length === 0) {
    //      throw new NotFoundError(
    //      `ExportJob with the specified criteria not found`
    //  );
    //}

    return exportJob.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingExportJobListByQuery",
      err,
    );
  }
};

module.exports = getExportJobListByQuery;
