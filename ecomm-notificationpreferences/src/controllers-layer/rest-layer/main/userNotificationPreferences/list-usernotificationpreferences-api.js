const { ListUserNotificationPreferencesManager } = require("apiLayer");

const NotificationPreferencesRestController = require("../../NotificationPreferencesServiceRestController");

class ListUserNotificationPreferencesRestController extends NotificationPreferencesRestController {
  constructor(req, res) {
    super(
      "listUserNotificationPreferences",
      "listusernotificationpreferences",
      req,
      res,
    );
    this.dataName = "userNotificationPreferencess";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListUserNotificationPreferencesManager(this._req, "rest");
  }
}

const listUserNotificationPreferences = async (req, res, next) => {
  const controller = new ListUserNotificationPreferencesRestController(
    req,
    res,
  );
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listUserNotificationPreferences;
