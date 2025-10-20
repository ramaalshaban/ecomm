const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const {
  UserNotificationPreferences,
  AdminNotificationConfig,
} = require("models");
const { Op } = require("sequelize");

const getUserNotificationPreferencesAggById = async (
  userNotificationPreferencesId,
) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const userNotificationPreferences = Array.isArray(
      userNotificationPreferencesId,
    )
      ? await UserNotificationPreferences.findAll({
          where: {
            id: { [Op.in]: userNotificationPreferencesId },
            isActive: true,
          },
          include: includes,
        })
      : await UserNotificationPreferences.findOne({
          where: {
            id: userNotificationPreferencesId,
            isActive: true,
          },
          include: includes,
        });

    if (!userNotificationPreferences) {
      return null;
    }

    const userNotificationPreferencesData =
      Array.isArray(userNotificationPreferencesId) &&
      userNotificationPreferencesId.length > 0
        ? userNotificationPreferences.map((item) => item.getData())
        : userNotificationPreferences.getData();
    await UserNotificationPreferences.getCqrsJoins(
      userNotificationPreferencesData,
    );
    return userNotificationPreferencesData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingUserNotificationPreferencesAggById",
      err,
    );
  }
};

module.exports = getUserNotificationPreferencesAggById;
