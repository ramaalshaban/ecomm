const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { hexaLogger } = require("common");
const { UserNotificationPreferences } = require("models");
const { Op } = require("sequelize");

const getUserNotificationPreferencesByUserId = async (userId) => {
  try {
    const userNotificationPreferences =
      await UserNotificationPreferences.findOne({
        where: {
          userId: userId,
          isActive: true,
        },
      });

    if (!userNotificationPreferences) {
      return null;
    }
    return userNotificationPreferences.getData();
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingUserNotificationPreferencesByUserId",
      err,
    );
  }
};

module.exports = getUserNotificationPreferencesByUserId;
