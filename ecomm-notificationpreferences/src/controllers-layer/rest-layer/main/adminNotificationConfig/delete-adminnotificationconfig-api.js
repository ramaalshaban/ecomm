const { DeleteAdminNotificationConfigManager } = require("apiLayer");

const NotificationPreferencesRestController = require("../../NotificationPreferencesServiceRestController");

class DeleteAdminNotificationConfigRestController extends NotificationPreferencesRestController {
  constructor(req, res) {
    super(
      "deleteAdminNotificationConfig",
      "deleteadminnotificationconfig",
      req,
      res,
    );
    this.dataName = "adminNotificationConfig";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteAdminNotificationConfigManager(this._req, "rest");
  }
}

const deleteAdminNotificationConfig = async (req, res, next) => {
  const controller = new DeleteAdminNotificationConfigRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteAdminNotificationConfig;
