const {
  getUserNotificationPreferencesById,
  getIdListOfUserNotificationPreferencesByField,
} = require("dbLayer");
const {
  getAdminNotificationConfigById,
  getIdListOfAdminNotificationConfigByField,
} = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexUserNotificationPreferencesData = async () => {
  const userNotificationPreferencesIndexer = new ElasticIndexer(
    "userNotificationPreferences",
    { isSilent: true },
  );
  console.log("Starting to update indexes for UserNotificationPreferences");
  const idList = (await getIdListOfUserNotificationPreferencesByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getUserNotificationPreferencesById(chunk);
    if (dataList.length) {
      await userNotificationPreferencesIndexer.indexBulkData(dataList);
      await userNotificationPreferencesIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const indexAdminNotificationConfigData = async () => {
  const adminNotificationConfigIndexer = new ElasticIndexer(
    "adminNotificationConfig",
    { isSilent: true },
  );
  console.log("Starting to update indexes for AdminNotificationConfig");
  const idList = (await getIdListOfAdminNotificationConfigByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getAdminNotificationConfigById(chunk);
    if (dataList.length) {
      await adminNotificationConfigIndexer.indexBulkData(dataList);
      await adminNotificationConfigIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexUserNotificationPreferencesData();
    console.log(
      "UserNotificationPreferences agregated data is indexed, total userNotificationPreferencess:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing UserNotificationPreferences data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  try {
    const dataCount = await indexAdminNotificationConfigData();
    console.log(
      "AdminNotificationConfig agregated data is indexed, total adminNotificationConfigs:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing AdminNotificationConfig data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
