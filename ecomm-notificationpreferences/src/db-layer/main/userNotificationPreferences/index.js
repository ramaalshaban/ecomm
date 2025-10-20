const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createUserNotificationPreferences: utils.createUserNotificationPreferences,
  getIdListOfUserNotificationPreferencesByField:
    utils.getIdListOfUserNotificationPreferencesByField,
  getUserNotificationPreferencesById: utils.getUserNotificationPreferencesById,
  getUserNotificationPreferencesAggById:
    utils.getUserNotificationPreferencesAggById,
  getUserNotificationPreferencesListByQuery:
    utils.getUserNotificationPreferencesListByQuery,
  getUserNotificationPreferencesStatsByQuery:
    utils.getUserNotificationPreferencesStatsByQuery,
  getUserNotificationPreferencesByQuery:
    utils.getUserNotificationPreferencesByQuery,
  updateUserNotificationPreferencesById:
    utils.updateUserNotificationPreferencesById,
  updateUserNotificationPreferencesByIdList:
    utils.updateUserNotificationPreferencesByIdList,
  updateUserNotificationPreferencesByQuery:
    utils.updateUserNotificationPreferencesByQuery,
  deleteUserNotificationPreferencesById:
    utils.deleteUserNotificationPreferencesById,
  deleteUserNotificationPreferencesByQuery:
    utils.deleteUserNotificationPreferencesByQuery,
  getUserNotificationPreferencesByUserId:
    utils.getUserNotificationPreferencesByUserId,
  dbScriptCreateUsernotificationpreferences:
    dbApiScripts.dbScriptCreateUsernotificationpreferences,
  dbScriptGetUsernotificationpreferences:
    dbApiScripts.dbScriptGetUsernotificationpreferences,
  dbScriptUpdateUsernotificationpreferences:
    dbApiScripts.dbScriptUpdateUsernotificationpreferences,
  dbScriptDeleteUsernotificationpreferences:
    dbApiScripts.dbScriptDeleteUsernotificationpreferences,
  dbScriptListUsernotificationpreferences:
    dbApiScripts.dbScriptListUsernotificationpreferences,
};
