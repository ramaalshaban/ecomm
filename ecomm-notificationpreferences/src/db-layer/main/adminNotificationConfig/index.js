const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createAdminNotificationConfig: utils.createAdminNotificationConfig,
  getIdListOfAdminNotificationConfigByField:
    utils.getIdListOfAdminNotificationConfigByField,
  getAdminNotificationConfigById: utils.getAdminNotificationConfigById,
  getAdminNotificationConfigAggById: utils.getAdminNotificationConfigAggById,
  getAdminNotificationConfigListByQuery:
    utils.getAdminNotificationConfigListByQuery,
  getAdminNotificationConfigStatsByQuery:
    utils.getAdminNotificationConfigStatsByQuery,
  getAdminNotificationConfigByQuery: utils.getAdminNotificationConfigByQuery,
  updateAdminNotificationConfigById: utils.updateAdminNotificationConfigById,
  updateAdminNotificationConfigByIdList:
    utils.updateAdminNotificationConfigByIdList,
  updateAdminNotificationConfigByQuery:
    utils.updateAdminNotificationConfigByQuery,
  deleteAdminNotificationConfigById: utils.deleteAdminNotificationConfigById,
  deleteAdminNotificationConfigByQuery:
    utils.deleteAdminNotificationConfigByQuery,
  getAdminNotificationConfigByAdminId:
    utils.getAdminNotificationConfigByAdminId,
  dbScriptCreateAdminnotificationconfig:
    dbApiScripts.dbScriptCreateAdminnotificationconfig,
  dbScriptGetAdminnotificationconfig:
    dbApiScripts.dbScriptGetAdminnotificationconfig,
  dbScriptUpdateAdminnotificationconfig:
    dbApiScripts.dbScriptUpdateAdminnotificationconfig,
  dbScriptDeleteAdminnotificationconfig:
    dbApiScripts.dbScriptDeleteAdminnotificationconfig,
  dbScriptListAdminnotificationconfigs:
    dbApiScripts.dbScriptListAdminnotificationconfigs,
};
