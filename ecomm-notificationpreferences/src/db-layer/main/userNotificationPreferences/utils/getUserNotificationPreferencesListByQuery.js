const { HttpServerError, BadRequestError } = require("common");

const { UserNotificationPreferences } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getUserNotificationPreferencesListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const userNotificationPreferences =
      await UserNotificationPreferences.findAll({
        where: { ...query, isActive: true },
      });

    //should i add not found error or only return empty array?
    if (
      !userNotificationPreferences ||
      userNotificationPreferences.length === 0
    )
      return [];

    //      if (!userNotificationPreferences || userNotificationPreferences.length === 0) {
    //      throw new NotFoundError(
    //      `UserNotificationPreferences with the specified criteria not found`
    //  );
    //}

    return userNotificationPreferences.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingUserNotificationPreferencesListByQuery",
      err,
    );
  }
};

module.exports = getUserNotificationPreferencesListByQuery;
