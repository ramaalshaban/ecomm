const express = require("express");

// UserNotificationPreferences Db Object Rest Api Router
const userNotificationPreferencesRouter = express.Router();

// add UserNotificationPreferences controllers

// createUserNotificationPreferences controller
userNotificationPreferencesRouter.post(
  "/v1/usernotificationpreferencess",
  require("./create-usernotificationpreferences-api"),
);
// getUserNotificationPreferences controller
userNotificationPreferencesRouter.get(
  "/v1/usernotificationpreferencess/:userNotificationPreferencesId",
  require("./get-usernotificationpreferences-api"),
);
// updateUserNotificationPreferences controller
userNotificationPreferencesRouter.patch(
  "/v1/usernotificationpreferencess/:userNotificationPreferencesId",
  require("./update-usernotificationpreferences-api"),
);
// deleteUserNotificationPreferences controller
userNotificationPreferencesRouter.delete(
  "/v1/usernotificationpreferencess/:userNotificationPreferencesId",
  require("./delete-usernotificationpreferences-api"),
);
// listUserNotificationPreferences controller
userNotificationPreferencesRouter.get(
  "/v1/usernotificationpreferencess",
  require("./list-usernotificationpreferences-api"),
);

module.exports = userNotificationPreferencesRouter;
