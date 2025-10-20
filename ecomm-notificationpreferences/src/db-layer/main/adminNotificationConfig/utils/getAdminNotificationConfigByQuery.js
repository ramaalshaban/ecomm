const { HttpServerError, BadRequestError } = require("common");

const { AdminNotificationConfig } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getAdminNotificationConfigByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const adminNotificationConfig = await AdminNotificationConfig.findOne({
      where: query,
    });

    if (!adminNotificationConfig) return null;
    return adminNotificationConfig.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingAdminNotificationConfigByQuery",
      err,
    );
  }
};

module.exports = getAdminNotificationConfigByQuery;
