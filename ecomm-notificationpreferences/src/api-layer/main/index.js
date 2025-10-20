module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // UserNotificationPreferences Db Object
  CreateUserNotificationPreferencesManager: require("./userNotificationPreferences/create-usernotificationpreferences-api"),
  GetUserNotificationPreferencesManager: require("./userNotificationPreferences/get-usernotificationpreferences-api"),
  UpdateUserNotificationPreferencesManager: require("./userNotificationPreferences/update-usernotificationpreferences-api"),
  DeleteUserNotificationPreferencesManager: require("./userNotificationPreferences/delete-usernotificationpreferences-api"),
  ListUserNotificationPreferencesManager: require("./userNotificationPreferences/list-usernotificationpreferences-api"),
  // AdminNotificationConfig Db Object
  CreateAdminNotificationConfigManager: require("./adminNotificationConfig/create-adminnotificationconfig-api"),
  GetAdminNotificationConfigManager: require("./adminNotificationConfig/get-adminnotificationconfig-api"),
  UpdateAdminNotificationConfigManager: require("./adminNotificationConfig/update-adminnotificationconfig-api"),
  DeleteAdminNotificationConfigManager: require("./adminNotificationConfig/delete-adminnotificationconfig-api"),
  ListAdminNotificationConfigsManager: require("./adminNotificationConfig/list-adminnotificationconfigs-api"),
};
