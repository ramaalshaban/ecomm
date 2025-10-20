module.exports = {
  NotificationPreferencesServiceManager: require("./service-manager/NotificationPreferencesServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // UserNotificationPreferences Db Object
  CreateUserNotificationPreferencesManager: require("./main/userNotificationPreferences/create-usernotificationpreferences-api"),
  GetUserNotificationPreferencesManager: require("./main/userNotificationPreferences/get-usernotificationpreferences-api"),
  UpdateUserNotificationPreferencesManager: require("./main/userNotificationPreferences/update-usernotificationpreferences-api"),
  DeleteUserNotificationPreferencesManager: require("./main/userNotificationPreferences/delete-usernotificationpreferences-api"),
  ListUserNotificationPreferencesManager: require("./main/userNotificationPreferences/list-usernotificationpreferences-api"),
  // AdminNotificationConfig Db Object
  CreateAdminNotificationConfigManager: require("./main/adminNotificationConfig/create-adminnotificationconfig-api"),
  GetAdminNotificationConfigManager: require("./main/adminNotificationConfig/get-adminnotificationconfig-api"),
  UpdateAdminNotificationConfigManager: require("./main/adminNotificationConfig/update-adminnotificationconfig-api"),
  DeleteAdminNotificationConfigManager: require("./main/adminNotificationConfig/delete-adminnotificationconfig-api"),
  ListAdminNotificationConfigsManager: require("./main/adminNotificationConfig/list-adminnotificationconfigs-api"),
  integrationRouter: require("./integrations/testRouter"),
};
