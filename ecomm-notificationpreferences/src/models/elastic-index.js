const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const userNotificationPreferencesMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  userId: { type: "keyword", index: true },
  orderUpdates: { type: "boolean", null_value: false },
  shippingUpdates: { type: "boolean", null_value: false },
  promoOptIn: { type: "boolean", null_value: false },
  paymentEvents: { type: "boolean", null_value: false },
  systemEvents: { type: "boolean", null_value: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const adminNotificationConfigMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  adminId: { type: "keyword", index: true },
  triggerEvents: { type: "keyword", index: true },
  notifyBy: { type: "keyword", index: true },
  enabled: { type: "boolean", null_value: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping(
      "userNotificationPreferences",
      userNotificationPreferencesMapping,
    );
    await new ElasticIndexer("userNotificationPreferences").updateMapping(
      userNotificationPreferencesMapping,
    );
    ElasticIndexer.addMapping(
      "adminNotificationConfig",
      adminNotificationConfigMapping,
    );
    await new ElasticIndexer("adminNotificationConfig").updateMapping(
      adminNotificationConfigMapping,
    );
  } catch (err) {
    hexaLogger.insertError(
      "UpdateElasticIndexMappingsError",
      { function: "updateElasticIndexMappings" },
      "elastic-index.js->updateElasticIndexMappings",
      err,
    );
  }
};

module.exports = updateElasticIndexMappings;
