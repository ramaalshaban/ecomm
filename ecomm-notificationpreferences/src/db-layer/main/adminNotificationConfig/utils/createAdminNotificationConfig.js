const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { AdminNotificationConfig } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("adminNotificationConfig");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["adminId", "triggerEvents", "notifyBy", "enabled"];

  requiredFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      throw new BadRequestError(
        `Field "${field}" is required and cannot be null or undefined.`,
      );
    }
  });

  if (!data.id) {
    data.id = newUUID();
  }
};

const createAdminNotificationConfig = async (data) => {
  try {
    validateData(data);

    const current_adminNotificationConfig = data.id
      ? await AdminNotificationConfig.findByPk(data.id)
      : null;
    let newadminNotificationConfig = null;

    if (current_adminNotificationConfig) {
      delete data.id;
      data.isActive = true;
      await current_adminNotificationConfig.update(data);
      newadminNotificationConfig = current_adminNotificationConfig;
    }

    if (!newadminNotificationConfig) {
      newadminNotificationConfig = await AdminNotificationConfig.create(data);
    }

    const _data = newadminNotificationConfig.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenCreatingAdminNotificationConfig",
      err,
    );
  }
};

module.exports = createAdminNotificationConfig;
