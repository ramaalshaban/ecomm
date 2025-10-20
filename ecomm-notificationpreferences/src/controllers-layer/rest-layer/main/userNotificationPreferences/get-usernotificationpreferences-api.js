const { GetUserNotificationPreferencesManager } = require("apiLayer");

const NotificationPreferencesRestController = require("../../NotificationPreferencesServiceRestController");

class GetUserNotificationPreferencesRestController extends NotificationPreferencesRestController {
  constructor(req, res) {
    super(
      "getUserNotificationPreferences",
      "getusernotificationpreferences",
      req,
      res,
    );
    this.dataName = "userNotificationPreferences";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetUserNotificationPreferencesManager(this._req, "rest");
  }
}

const getUserNotificationPreferences = async (req, res, next) => {
  const controller = new GetUserNotificationPreferencesRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getUserNotificationPreferences;
