const { GetAdminNotificationConfigManager } = require("apiLayer");

const NotificationPreferencesRestController = require("../../NotificationPreferencesServiceRestController");

class GetAdminNotificationConfigRestController extends NotificationPreferencesRestController {
  constructor(req, res) {
    super("getAdminNotificationConfig", "getadminnotificationconfig", req, res);
    this.dataName = "adminNotificationConfig";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetAdminNotificationConfigManager(this._req, "rest");
  }
}

const getAdminNotificationConfig = async (req, res, next) => {
  const controller = new GetAdminNotificationConfigRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getAdminNotificationConfig;
