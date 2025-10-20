const { CreateUserNotificationPreferencesManager } = require("apiLayer");

const NotificationPreferencesRestController = require("../../NotificationPreferencesServiceRestController");

class CreateUserNotificationPreferencesRestController extends NotificationPreferencesRestController {
  constructor(req, res) {
    super(
      "createUserNotificationPreferences",
      "createusernotificationpreferences",
      req,
      res,
    );
    this.dataName = "userNotificationPreferences";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateUserNotificationPreferencesManager(this._req, "rest");
  }
}

const createUserNotificationPreferences = async (req, res, next) => {
  const controller = new CreateUserNotificationPreferencesRestController(
    req,
    res,
  );
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createUserNotificationPreferences;
