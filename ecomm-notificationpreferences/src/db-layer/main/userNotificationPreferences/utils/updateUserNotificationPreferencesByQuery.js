const { HttpServerError, BadRequestError } = require("common");

const { UserNotificationPreferences } = require("models");
const { Op } = require("sequelize");

const updateUserNotificationPreferencesByQuery = async (dataClause, query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    let rowsCount = null;
    let rows = null;

    const options = { where: { query, isActive: true }, returning: true };

    [rowsCount, rows] = await UserNotificationPreferences.update(
      dataClause,
      options,
    );

    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingUserNotificationPreferencesByQuery",
      err,
    );
  }
};

module.exports = updateUserNotificationPreferencesByQuery;
