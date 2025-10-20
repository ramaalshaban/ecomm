const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { hexaLogger } = require("common");
const { AdminNotificationConfig } = require("models");
const { Op } = require("sequelize");

const getAdminNotificationConfigByAdminId = async (adminId) => {
  try {
    const adminNotificationConfig = await AdminNotificationConfig.findOne({
      where: {
        adminId: adminId,
        isActive: true,
      },
    });

    if (!adminNotificationConfig) {
      return null;
    }
    return adminNotificationConfig.getData();
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingAdminNotificationConfigByAdminId",
      err,
    );
  }
};

module.exports = getAdminNotificationConfigByAdminId;
