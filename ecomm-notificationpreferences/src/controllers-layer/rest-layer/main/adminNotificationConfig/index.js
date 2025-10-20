const express = require("express");

// AdminNotificationConfig Db Object Rest Api Router
const adminNotificationConfigRouter = express.Router();

// add AdminNotificationConfig controllers

// createAdminNotificationConfig controller
adminNotificationConfigRouter.post(
  "/v1/adminnotificationconfigs",
  require("./create-adminnotificationconfig-api"),
);
// getAdminNotificationConfig controller
adminNotificationConfigRouter.get(
  "/v1/adminnotificationconfigs/:adminNotificationConfigId",
  require("./get-adminnotificationconfig-api"),
);
// updateAdminNotificationConfig controller
adminNotificationConfigRouter.patch(
  "/v1/adminnotificationconfigs/:adminNotificationConfigId",
  require("./update-adminnotificationconfig-api"),
);
// deleteAdminNotificationConfig controller
adminNotificationConfigRouter.delete(
  "/v1/adminnotificationconfigs/:adminNotificationConfigId",
  require("./delete-adminnotificationconfig-api"),
);
// listAdminNotificationConfigs controller
adminNotificationConfigRouter.get(
  "/v1/adminnotificationconfigs",
  require("./list-adminnotificationconfigs-api"),
);

module.exports = adminNotificationConfigRouter;
