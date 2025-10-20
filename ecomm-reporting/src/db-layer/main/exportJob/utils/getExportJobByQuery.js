const { HttpServerError, BadRequestError } = require("common");

const { ExportJob } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getExportJobByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const exportJob = await ExportJob.findOne({
      where: query,
    });

    if (!exportJob) return null;
    return exportJob.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingExportJobByQuery",
      err,
    );
  }
};

module.exports = getExportJobByQuery;
