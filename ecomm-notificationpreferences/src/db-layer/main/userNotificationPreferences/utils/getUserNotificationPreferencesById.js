const { HttpServerError } = require("common");

let { UserNotificationPreferences } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getUserNotificationPreferencesById = async (
  userNotificationPreferencesId,
) => {
  try {
    const userNotificationPreferences = Array.isArray(
      userNotificationPreferencesId,
    )
      ? await UserNotificationPreferences.findAll({
          where: {
            id: { [Op.in]: userNotificationPreferencesId },
            isActive: true,
          },
        })
      : await UserNotificationPreferences.findOne({
          where: {
            id: userNotificationPreferencesId,
            isActive: true,
          },
        });

    if (!userNotificationPreferences) {
      return null;
    }
    return Array.isArray(userNotificationPreferencesId)
      ? userNotificationPreferences.map((item) => item.getData())
      : userNotificationPreferences.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingUserNotificationPreferencesById",
      err,
    );
  }
};

module.exports = getUserNotificationPreferencesById;
