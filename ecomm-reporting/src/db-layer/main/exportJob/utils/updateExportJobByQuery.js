const { HttpServerError, BadRequestError } = require("common");

const { ExportJob } = require("models");
const { Op } = require("sequelize");

const updateExportJobByQuery = async (dataClause, query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    let rowsCount = null;
    let rows = null;

    const options = { where: { query, isActive: true }, returning: true };

    [rowsCount, rows] = await ExportJob.update(dataClause, options);

    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingExportJobByQuery",
      err,
    );
  }
};

module.exports = updateExportJobByQuery;
