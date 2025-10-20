const { HttpServerError, BadRequestError } = require("common");

const { AdminNotificationConfig } = require("models");
const { Op } = require("sequelize");

const updateAdminNotificationConfigByQuery = async (dataClause, query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    let rowsCount = null;
    let rows = null;

    const options = { where: { query, isActive: true }, returning: true };

    [rowsCount, rows] = await AdminNotificationConfig.update(
      dataClause,
      options,
    );

    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingAdminNotificationConfigByQuery",
      err,
    );
  }
};

module.exports = updateAdminNotificationConfigByQuery;
