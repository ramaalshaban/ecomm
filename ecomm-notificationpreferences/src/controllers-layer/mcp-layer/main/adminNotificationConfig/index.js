module.exports = (headers) => {
  // AdminNotificationConfig Db Object Rest Api Router
  const adminNotificationConfigMcpRouter = [];

  // createAdminNotificationConfig controller
  adminNotificationConfigMcpRouter.push(
    require("./create-adminnotificationconfig-api")(headers),
  );
  // getAdminNotificationConfig controller
  adminNotificationConfigMcpRouter.push(
    require("./get-adminnotificationconfig-api")(headers),
  );
  // updateAdminNotificationConfig controller
  adminNotificationConfigMcpRouter.push(
    require("./update-adminnotificationconfig-api")(headers),
  );
  // deleteAdminNotificationConfig controller
  adminNotificationConfigMcpRouter.push(
    require("./delete-adminnotificationconfig-api")(headers),
  );
  // listAdminNotificationConfigs controller
  adminNotificationConfigMcpRouter.push(
    require("./list-adminnotificationconfigs-api")(headers),
  );

  return adminNotificationConfigMcpRouter;
};
