const { HttpServerError, BadRequestError } = require("common");

const { UserNotificationPreferences } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getUserNotificationPreferencesByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const userNotificationPreferences =
      await UserNotificationPreferences.findOne({
        where: query,
      });

    if (!userNotificationPreferences) return null;
    return userNotificationPreferences.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingUserNotificationPreferencesByQuery",
      err,
    );
  }
};

module.exports = getUserNotificationPreferencesByQuery;
